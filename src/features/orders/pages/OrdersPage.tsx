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
import { useAppSettings } from '@/features/marketing/hooks/useMarketing';
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
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: allOrders = [] } = useOrders({});
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useOrders({
    status: statusFilter,
    search,
  });

  const { data: settings = [] } = useAppSettings();
  const currentFreeThreshold =
    Number(settings.find((s) => s.key === 'free_delivery_threshold')?.value ?? '450') || 0;

  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const handleStatusUpdate = async (orderId: string, nextStatus: OrderStatus) => {
    const updated = await updateStatus({ orderId, status: nextStatus });
    setSelectedOrder(updated);
    toast.success(STRINGS.orders.statusUpdatedToast);
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: STRINGS.orders.columns.code,
          cell: (info) => {
            const fullId = info.getValue();
            return (
              <span
                dir="ltr"
                title={fullId}
                className="inline-block font-title text-title-sm text-on-surface tabular-nums"
              >
                #{fullId.slice(0, 8)}
              </span>
            );
          },
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
          cell: (info) => {
            const order = info.row.original;
            const threshold = order.freeDeliveryThreshold ?? currentFreeThreshold;
            return (
              <div className="flex flex-col gap-xs">
                <span className="font-headline text-title-sm text-primary tabular-nums">
                  {formatCurrency(info.getValue())}
                </span>
                {order.discount > 0 ? (
                  <Badge variant="mint">
                    خصم كوبون {formatCurrency(order.discount)}
                    {order.promoCode ? ` (${order.promoCode})` : ''}
                  </Badge>
                ) : null}
                <span className="font-body text-[11px] text-on-surface-muted tabular-nums">
                  {order.deliveryFee === 0
                    ? threshold > 0
                      ? `توصيل مجاني (الطلب ≥ ${formatCurrency(threshold)})`
                      : 'توصيل مجاني'
                    : threshold > 0
                      ? `توصيل ${formatCurrency(order.deliveryFee)} (أقل من ${formatCurrency(threshold)})`
                      : `توصيل ${formatCurrency(order.deliveryFee)}`}
                </span>
              </div>
            );
          },
        }),
        columnHelper.accessor('paymentStatus', {
          header: STRINGS.orders.columns.paymentStatus,
          cell: () => <Badge variant="neutral">{STRINGS.orders.paymentFilters.cod}</Badge>,
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
    [currentFreeThreshold],
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
            {
              value: 'all',
              label: `${STRINGS.orders.allCountPrefix} (${formatNumber(allOrders.length)})`,
            },
            { value: 'pending', label: STRINGS.orders.statusLabels.pending },
            { value: 'processing', label: STRINGS.orders.statusLabels.processing },
            { value: 'delivered', label: STRINGS.orders.statusLabels.delivered },
            { value: 'cancelled', label: STRINGS.orders.statusLabels.cancelled },
          ]}
        />
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
          selectedOrder
            ? `${STRINGS.orders.detailsModalTitle} #${selectedOrder.id.slice(0, 8)}`
            : ''
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

            <div className="flex flex-col gap-xs pt-sm border-t border-outline-subtle bg-surface p-md rounded-md">
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-muted">المجموع الفرعي</span>
                <span className="font-title text-on-surface tabular-nums">
                  {formatCurrency(selectedOrder.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-muted">رسوم التوصيل</span>
                <span className="font-title text-on-surface tabular-nums">
                  {selectedOrder.deliveryFee === 0
                    ? 'مجاني'
                    : formatCurrency(selectedOrder.deliveryFee)}
                </span>
              </div>
              {(() => {
                const threshold = selectedOrder.freeDeliveryThreshold ?? currentFreeThreshold;
                if (threshold <= 0) return null;
                return (
                  <p className="font-body text-[12px] text-primary">
                    {selectedOrder.deliveryFee === 0
                      ? `توصيل مجاني لأن قيمة الطلب (${formatCurrency(selectedOrder.subtotal)}) أكبر من أو تساوي الحد المحدد في الإعدادات (${formatCurrency(threshold)})`
                      : `تم احتساب رسوم التوصيل (${formatCurrency(selectedOrder.deliveryFee)}) لأن قيمة الطلب (${formatCurrency(selectedOrder.subtotal)}) أقل من الحد المحدد للتوصيل المجاني (${formatCurrency(threshold)})`}
                  </p>
                );
              })()}
              {selectedOrder.discount > 0 ? (
                <div className="flex items-center justify-between text-body-sm text-primary">
                  <span>
                    خصم كوبون{selectedOrder.promoCode ? ` (${selectedOrder.promoCode})` : ''}
                  </span>
                  <span className="font-title tabular-nums">
                    - {formatCurrency(selectedOrder.discount)}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between pt-xs border-t border-outline-subtle">
                <span className="font-headline text-title-md text-on-surface">
                  {STRINGS.orders.columns.total}
                </span>
                <span className="font-headline text-headline-md text-primary tabular-nums">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>
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

            {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 ? (
              <div className="flex flex-col gap-xs pt-sm border-t border-outline-subtle">
                <h3 className="font-title text-title-sm text-on-surface">
                  {STRINGS.orders.historyTitle}
                </h3>
                <div className="flex flex-col gap-xs">
                  {selectedOrder.statusHistory.map((h) => (
                    <div
                      key={h.id}
                      className="text-body-sm text-on-surface-muted flex items-center justify-between gap-sm bg-surface px-sm py-xs rounded-sm border border-outline-subtle"
                    >
                      <span>
                        {STRINGS.orders.statusLabels[h.toStatus]}
                        {h.note ? ` — ${h.note}` : ''}
                      </span>
                      {h.changedByName ? (
                        <span className="text-on-surface-subtle">{h.changedByName}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
