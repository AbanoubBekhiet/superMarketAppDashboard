import { useMemo, useState } from 'react';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { FilterChips } from '@/components/ui/FilterChips';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useOrders, useUpdateOrderStatus } from '@/features/orders/hooks/useOrders';
import { formatCurrency, formatDateTime, formatNumber } from '@/lib/format';
import type { Order, OrderStatus } from '@/types/domain';

const STATUS_BADGE: Record<OrderStatus, BadgeVariant> = {
  pending: 'warning',
  processing: 'mint',
  on_the_way: 'mint',
  delivered: 'mint',
  cancelled: 'error',
};

const ALL_ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'on_the_way',
  'delivered',
  'cancelled',
];

const columnHelper = legacyCreateColumnHelper<Order>();

export function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'cod'>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useOrders({
    status: statusFilter,
    paymentStatus: paymentFilter,
    search,
  });

  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const handleStatusUpdate = async (orderId: string, nextStatus: OrderStatus) => {
    const updated = await updateStatus({ orderId, status: nextStatus });
    setSelectedOrder(updated);
    toast.success(STRINGS.orders.statusUpdatedToast);
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('code', {
          header: STRINGS.orders.columns.code,
          cell: (info) => (
            <span className="font-title text-title-sm text-on-surface tabular-nums">
              {info.getValue()}
            </span>
          ),
        }),
        columnHelper.accessor('customerName', {
          header: STRINGS.orders.columns.customer,
          cell: (info) => (
            <span className="font-body text-body-md text-on-surface">{info.getValue()}</span>
          ),
        }),
        columnHelper.accessor('createdAt', {
          header: STRINGS.orders.columns.date,
          cell: (info) => (
            <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
              {formatDateTime(info.getValue())}
            </span>
          ),
        }),
        columnHelper.accessor('total', {
          header: STRINGS.orders.columns.total,
          cell: (info) => (
            <span className="font-headline text-title-sm text-primary tabular-nums">
              {formatCurrency(info.getValue())}
            </span>
          ),
        }),
        columnHelper.accessor('paymentStatus', {
          header: STRINGS.orders.columns.paymentStatus,
          cell: (info) => {
            const paid = info.getValue() === 'paid';
            return (
              <Badge variant={paid ? 'mint' : 'neutral'}>
                {paid ? STRINGS.orders.paymentFilters.paid : STRINGS.orders.paymentFilters.cod}
              </Badge>
            );
          },
        }),
        columnHelper.accessor('status', {
          header: STRINGS.orders.columns.orderStatus,
          cell: (info) => {
            const st = info.getValue();
            return <Badge variant={STATUS_BADGE[st]}>{STRINGS.orders.statusLabels[st]}</Badge>;
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: STRINGS.orders.columns.action,
          cell: (info) => (
            <Button
              variant="outline"
              size="sm"
              className="text-primary"
              onClick={() => setSelectedOrder(info.row.original)}
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{STRINGS.orders.viewDetails}</span>
            </Button>
          ),
        }),
      ] as LegacyColumnDef<Order, unknown>[],
    [],
  );

  return (
    <AdminLayout
      title={STRINGS.orders.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.orders.searchPlaceholder}
    >
      {/* Filter Bar */}
      <section className="flex items-center justify-between gap-md flex-wrap">
        <FilterChips<'all' | OrderStatus>
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: `${STRINGS.orders.allCountPrefix} (${formatNumber(48)})` },
            { value: 'pending', label: STRINGS.orders.statusLabels.pending },
            { value: 'processing', label: STRINGS.orders.statusLabels.processing },
            { value: 'delivered', label: STRINGS.orders.statusLabels.delivered },
            { value: 'cancelled', label: STRINGS.orders.statusLabels.cancelled },
          ]}
        />

        <div className="w-48">
          <Select
            aria-label={STRINGS.orders.columns.paymentStatus}
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value as 'all' | 'paid' | 'cod')}
            options={[
              { value: 'all', label: STRINGS.orders.paymentFilters.all },
              { value: 'paid', label: STRINGS.orders.paymentFilters.paid },
              { value: 'cod', label: STRINGS.orders.paymentFilters.cod },
            ]}
          />
        </div>
      </section>

      {/* Orders Table */}
      <Card padded={false} className="overflow-hidden">
        {isError ? <ErrorState onRetry={refetch} /> : <DataTable data={orders} columns={columns} isLoading={isLoading} />}
      </Card>

      {/* Order Details Modal */}
      <Modal
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title={
          selectedOrder ? `${STRINGS.orders.detailsModalTitle} ${selectedOrder.code}` : ''
        }
      >
        {selectedOrder ? (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-md bg-surface border border-outline-subtle flex flex-col gap-xs">
              <span className="font-title text-title-sm text-on-surface">
                {selectedOrder.customerName}
              </span>
              <span className="font-body text-body-sm text-on-surface-muted">
                {STRINGS.orders.customerAddress}: {selectedOrder.customerAddress}
              </span>
            </div>

            <div className="flex flex-col gap-xs">
              <h3 className="font-title text-title-sm text-on-surface">
                {STRINGS.orders.itemsTitle}
              </h3>
              <div className="divide-y divide-outline-subtle border border-outline-subtle rounded-md px-md">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="py-sm flex items-center justify-between gap-md"
                  >
                    <span className="font-body text-body-md text-on-surface">
                      {item.name} × {formatNumber(item.quantity)}
                    </span>
                    <span className="font-headline text-title-sm text-primary tabular-nums">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-sm border-t border-outline-subtle">
              <span className="font-headline text-title-md text-on-surface">
                {STRINGS.orders.columns.total}
              </span>
              <span className="font-headline text-headline-md text-primary tabular-nums">
                {formatCurrency(selectedOrder.total)}
              </span>
            </div>

            <Select
              label={STRINGS.orders.changeStatusLabel}
              value={selectedOrder.status}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusUpdate(selectedOrder.id, e.target.value as OrderStatus)
              }
              options={ALL_ORDER_STATUSES.map((st) => ({
                value: st,
                label: STRINGS.orders.statusLabels[st],
              }))}
            />
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
