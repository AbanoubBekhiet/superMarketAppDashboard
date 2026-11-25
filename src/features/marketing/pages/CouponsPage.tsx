import { Plus, TicketPercent, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { EmptyState, ErrorState, TableSkeleton } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import {
  useCoupons,
  useDeleteCoupon,
  useUpsertCoupon,
} from '@/features/marketing/hooks/useMarketing';
import { useInfiniteSlice } from '@/hooks/useInfiniteSlice';
import { formatCurrency, formatNumber } from '@/lib/format';

export function CouponsPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'fixed' | 'percentage'>('fixed');
  const [couponValue, setCouponValue] = useState('25');
  const [couponMinOrder, setCouponMinOrder] = useState('100');
  const [deletingCoupon, setDeletingCoupon] = useState<{ id: string; code: string } | null>(null);

  const { data: coupons = [], isLoading, isError, refetch } = useCoupons();
  const { mutateAsync: saveCoupon, isPending: savingCoupon } = useUpsertCoupon();
  const { mutateAsync: removeCoupon, isPending: isDeletingCoupon } = useDeleteCoupon();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coupons;
    return coupons.filter((c) => c.code.toLowerCase().includes(q));
  }, [coupons, search]);

  const {
    visibleItems: visibleCoupons,
    hasMore,
    loadMore,
    sentinelRef,
    totalCount,
  } = useInfiniteSlice({
    items: filtered,
    initialCount: 15,
    step: 15,
    resetKey: `${search}-${filtered.length}`,
  });

  const handleAddCoupon = async (event: React.FormEvent) => {
    event.preventDefault();
    const val = Number(couponValue);
    const min = Number(couponMinOrder);
    if (!couponCode.trim() || !Number.isFinite(val) || val <= 0) {
      toast.error(STRINGS.common.requiredField);
      return;
    }
    try {
      await saveCoupon({
        code: couponCode.trim(),
        type: couponType,
        value: val,
        minOrder: Number.isFinite(min) ? min : 0,
        isActive: true,
      });
      toast.success(STRINGS.marketing.couponSavedToast);
      setCouponCode('');
      setModalOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  return (
    <AdminLayout
      title={STRINGS.sidebar.coupons}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="ابحث بكود الخصم..."
    >
      <div className="flex flex-col gap-base">
        <div className="flex items-center justify-between gap-md flex-wrap">
          <p className="font-body text-body-md text-on-surface-muted">
            إنشاء وإدارة أكواد الخصم الترويجية وإشعار العملاء تلقائياً
          </p>
          <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>{STRINGS.marketing.addCouponBtn}</span>
          </Button>
        </div>

        <Card padded={false} className="overflow-hidden">
          <div className="px-lg py-md border-b border-outline-subtle flex items-center gap-sm">
            <TicketPercent className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-headline text-title-lg text-on-surface tabular-nums">
              {STRINGS.marketing.couponsTitle} ({formatNumber(filtered.length)})
            </h2>
          </div>

          {isLoading ? (
            <TableSkeleton rows={4} />
          ) : isError ? (
            <ErrorState onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="divide-y divide-outline-subtle">
                {visibleCoupons.map((c) => (
                  <div key={c.id} className="px-lg py-md flex items-center justify-between gap-md">
                    <div className="flex items-center gap-md flex-wrap">
                      <Badge variant="mint">{c.code}</Badge>
                      <span className="font-body text-body-md text-on-surface-muted">
                        {c.type === 'fixed' ? formatCurrency(c.value) : `${formatNumber(c.value)}%`}{' '}
                        • حد أدنى {formatCurrency(c.minOrder)}
                      </span>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      aria-label={STRINGS.common.delete}
                      onClick={() => setDeletingCoupon({ id: c.id, code: c.code })}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                ))}
              </div>
              <div
                ref={sentinelRef}
                className="flex items-center justify-between px-lg py-sm border-t border-outline-subtle bg-surface"
              >
                <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
                  {STRINGS.common.showingCount} {formatNumber(visibleCoupons.length)}{' '}
                  {STRINGS.common.from} {formatNumber(totalCount)}
                </span>
                {hasMore ? (
                  <Button variant="outline" size="sm" onClick={loadMore}>
                    {STRINGS.common.loadMore}
                  </Button>
                ) : null}
              </div>
            </>
          )}
        </Card>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={STRINGS.marketing.addCouponBtn}
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleAddCoupon} className="flex flex-col gap-md" noValidate>
          <Input
            label={STRINGS.marketing.couponCode}
            placeholder="مثال: طازج25"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Select
            label={STRINGS.marketing.couponType}
            value={couponType}
            onChange={(e) => setCouponType(e.target.value as 'fixed' | 'percentage')}
            options={[
              { value: 'fixed', label: STRINGS.marketing.couponTypeFixed },
              { value: 'percentage', label: STRINGS.marketing.couponTypePercent },
            ]}
          />
          <div className="grid grid-cols-2 gap-sm">
            <Input
              label={STRINGS.marketing.couponValue}
              type="number"
              value={couponValue}
              onChange={(e) => setCouponValue(e.target.value)}
            />
            <Input
              label={STRINGS.marketing.couponMinOrder}
              type="number"
              value={couponMinOrder}
              onChange={(e) => setCouponMinOrder(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-sm pt-sm">
            <Button type="submit" variant="primary" size="lg" isLoading={savingCoupon} className="flex-1">
              {STRINGS.common.save}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setModalOpen(false)}>
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={deletingCoupon !== null}
        onClose={() => setDeletingCoupon(null)}
        isLoading={isDeletingCoupon}
        message={
          deletingCoupon
            ? `هل أنت متأكد من حذف كوبون الخصم «${deletingCoupon.code}»؟ لا يمكن التراجع عن هذا الإجراء.`
            : STRINGS.common.confirmDeleteGeneric
        }
        onConfirm={async () => {
          if (!deletingCoupon) return;
          try {
            await removeCoupon(deletingCoupon.id);
            toast.success(STRINGS.categories.deletedToast);
            setDeletingCoupon(null);
          } catch (err) {
            const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
            toast.error(msg || STRINGS.common.errorMessage);
          }
        }}
      />
    </AdminLayout>
  );
}
