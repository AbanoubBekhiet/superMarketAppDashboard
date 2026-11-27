import { useCallback, useMemo, useState } from 'react';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { FilterChips } from '@/components/ui/FilterChips';
import { Modal } from '@/components/ui/Modal';
import { ResolvedAddressText } from '@/components/ui/ResolvedAddressText';
import { Select } from '@/components/ui/Select';
import { ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useAppSettings } from '@/features/marketing/hooks/useMarketing';
import { useOrders, useUpdateOrderStatus } from '@/features/orders/hooks/useOrders';
import { formatCurrency, formatDateTime, formatNumber } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import type { Order, OrderStatus } from '@/types/domain';

const STATUS_SELECT_CLASS: Record<OrderStatus, string> = {
  pending: 'bg-warning-container text-on-warning-container border-warning-container',
  processing: 'bg-mint-surface text-on-mint-surface border-primary/30',
  on_the_way: 'bg-mint-surface text-on-mint-surface border-primary/30',
  delivered: 'bg-mint-surface text-primary border-primary/40',
  cancelled: 'bg-error-container text-on-error-container border-error/30',
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

  const handleStatusUpdate = useCallback(
    async (orderId: string, nextStatus: OrderStatus) => {
      try {
        const updated = await updateStatus({ orderId, status: nextStatus });
        setSelectedOrder((prev) =>
          prev?.id === orderId
            ? {
                ...updated,
                customerLatitude: updated.customerLatitude ?? prev.customerLatitude,
                customerLongitude: updated.customerLongitude ?? prev.customerLongitude,
              }
            : prev,
        );
        toast.success(STRINGS.orders.statusUpdatedToast);
      } catch (err) {
        const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
        toast.error(msg || STRINGS.common.errorMessage);
      }
    },
    [updateStatus],
  );

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('code', {
          header: STRINGS.orders.columns.code,
          cell: (info) => {
            const order = info.row.original;
            const displayCode = info.getValue() || `#${order.id.slice(0, 8)}`;
            return (
              <span
                dir="ltr"
                title={order.id}
                className="inline-block font-title text-title-sm text-on-surface tabular-nums"
              >
                {displayCode}
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
            const order = info.row.original;
            const st = info.getValue();
            return (
              <select
                aria-label={`${STRINGS.orders.changeStatusLabel} ${order.code}`}
                value={st}
                disabled={isUpdating}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                className={`rounded-full border px-sm py-xs font-label-bold text-label-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${STATUS_SELECT_CLASS[st]}`}
              >
                {ALL_ORDER_STATUSES.map((optionStatus) => (
                  <option key={optionStatus} value={optionStatus} className="bg-surface-card text-on-surface">
                    {STRINGS.orders.statusLabels[optionStatus]}
                  </option>
                ))}
              </select>
            );
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
    [currentFreeThreshold, handleStatusUpdate, isUpdating],
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
            {
              value: 'pending',
              label: `${STRINGS.orders.statusLabels.pending} (${formatNumber(allOrders.filter((o) => o.status === 'pending').length)})`,
            },
            {
              value: 'processing',
              label: `${STRINGS.orders.statusLabels.processing} (${formatNumber(allOrders.filter((o) => o.status === 'processing').length)})`,
            },
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
            ? `${STRINGS.orders.detailsModalTitle} ${selectedOrder.code || `#${selectedOrder.id.slice(0, 8)}`}`
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
                {STRINGS.orders.customerAddress}:{' '}
                <ResolvedAddressText
                  latitude={selectedOrder.customerLatitude}
                  longitude={selectedOrder.customerLongitude}
                  fallback={selectedOrder.customerAddress || selectedOrder.customerArea}
                  className="font-body text-body-sm text-on-surface"
                />
              </span>
            </div>

            <div className="flex flex-col gap-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-title text-title-sm text-on-surface">
                  {STRINGS.orders.itemsTitle}
                </h3>
                <Badge variant="mint">
                  {formatNumber(selectedOrder.itemsCount)} {STRINGS.activeCarts.itemsSuffix}
                </Badge>
              </div>
              <div className="flex flex-col gap-xs">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="p-sm rounded-lg border border-outline-subtle bg-surface flex items-center justify-between gap-sm"
                  >
                    <div className="flex items-center gap-sm min-w-0">
                      <img
                        src={getImageUrl(item.imageKey)}
                        alt={item.name}
                        className="w-10 h-10 rounded-md object-cover bg-surface-card border border-outline-subtle shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-title text-title-sm text-on-surface truncate">
                          {item.name}
                        </span>
                        <span className="font-body text-body-sm text-on-surface-subtle tabular-nums">
                          {formatNumber(item.quantity)} × {formatCurrency(item.unitPrice)}
                        </span>
                      </div>
                    </div>
                    <span className="font-headline text-title-sm text-primary tabular-nums shrink-0">
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
