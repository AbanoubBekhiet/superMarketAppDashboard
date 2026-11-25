import { Percent, Plus, Trash2 } from 'lucide-react';
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
import { CardSkeleton, EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useProducts, useUpdateProduct } from '@/features/products/hooks/useProducts';
import { useInfiniteSlice } from '@/hooks/useInfiniteSlice';
import { formatCurrency, formatNumber } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import type { Product } from '@/types/domain';

export function OffersPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [offerPriceInput, setOfferPriceInput] = useState('');
  const [removingOffer, setRemovingOffer] = useState<Product | null>(null);

  const { data: products = [], isLoading, isError, refetch } = useProducts({ search });
  const { mutateAsync: updateProduct, isPending: isSaving } = useUpdateProduct();

  const offerProducts = useMemo(
    () =>
      products.filter(
        (p) => Boolean(p.isDailyOffer) || (p.salePrice !== null && p.salePrice !== undefined),
      ),
    [products],
  );

  const nonOfferProducts = useMemo(
    () => products.filter((p) => !p.isDailyOffer && !p.salePrice),
    [products],
  );

  const {
    visibleItems: visibleOffers,
    hasMore,
    loadMore,
    sentinelRef,
    totalCount,
  } = useInfiniteSlice({
    items: offerProducts,
    initialCount: 12,
    step: 12,
    resetKey: `${search}-${offerProducts.length}`,
  });

  const openAddOffer = () => {
    const first = nonOfferProducts[0] ?? products[0];
    setSelectedProductId(first?.id ?? '');
    const basePrice = first ? (first.regularPrice ?? first.price) : 0;
    setOfferPriceInput(basePrice > 0 ? String(Math.max(1, Math.round(basePrice * 0.85))) : '');
    setModalOpen(true);
  };

  const handleSaveOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = products.find((p) => p.id === selectedProductId);
    const saleVal = Number(offerPriceInput);
    if (!target || !Number.isFinite(saleVal) || saleVal <= 0) {
      toast.error(STRINGS.common.positiveNumber);
      return;
    }
    const basePrice = target.regularPrice ?? target.price;
    if (saleVal >= basePrice) {
      toast.error('يجب أن يكون سعر العرض أقل من السعر الأصلي للمنتج');
      return;
    }

    try {
      await updateProduct({
        id: target.id,
        payload: {
          price: basePrice,
          salePrice: saleVal,
          isDailyOffer: true,
          isActive: true,
        },
      });
      toast.success('تم إضافة العرض بنجاح وإشعار العملاء');
      setModalOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const handleConfirmRemoveOffer = async () => {
    if (!removingOffer) return;
    try {
      await updateProduct({
        id: removingOffer.id,
        payload: {
          price: removingOffer.regularPrice ?? removingOffer.price,
          salePrice: null,
          isDailyOffer: false,
        },
      });
      toast.success('تم إزالة المنتج من قائمة العروض');
      setRemovingOffer(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  return (
    <AdminLayout
      title={STRINGS.sidebar.offers}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.products.searchPlaceholder}
    >
      <div className="flex flex-col gap-base">
        <div className="flex flex-wrap items-center justify-between gap-md">
          <p className="font-body text-body-md text-on-surface-muted">
            إدارة عروض اليوم والخصومات المباشرة على المنتجات الظاهرة للعملاء
          </p>
          <Button variant="primary" size="md" onClick={openAddOffer} disabled={products.length === 0}>
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>إضافة عرض على منتج</span>
          </Button>
        </div>

        {isLoading ? (
          <CardSkeleton count={3} />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : offerProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg items-stretch">
              {visibleOffers.map((product) => {
                const regular = product.regularPrice ?? product.oldPrice ?? product.price;
                const offer = product.salePrice ?? product.price;
                const pct =
                  regular > offer ? Math.round(((regular - offer) / regular) * 100) : 0;
                return (
                  <Card key={product.id} className="flex flex-col justify-between gap-md">
                    <div className="flex items-center gap-md">
                      <img
                        src={getImageUrl(product.imageKey)}
                        alt={product.name}
                        className="w-16 h-16 rounded-md object-cover bg-surface border border-outline-subtle shrink-0"
                      />
                      <div className="flex flex-col gap-xs min-w-0">
                        <h2 className="font-headline text-title-md text-on-surface truncate">
                          {product.name}
                        </h2>
                        <span className="font-body text-body-sm text-on-surface-subtle">
                          {product.categoryName}
                        </span>
                        <div className="flex items-center gap-sm flex-wrap">
                          <span className="font-headline text-title-md text-primary tabular-nums">
                            {formatCurrency(offer)}
                          </span>
                          {regular > offer ? (
                            <span className="font-body text-body-sm text-on-surface-subtle line-through tabular-nums">
                              {formatCurrency(regular)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <footer className="pt-sm border-t border-outline-subtle flex items-center justify-between gap-sm">
                      <Badge variant="mint">
                        <Percent className="w-3 h-3 inline me-1" aria-hidden="true" />
                        <span>خصم {formatNumber(pct)}%</span>
                      </Badge>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRemovingOffer(product)}
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>إنهاء العرض</span>
                      </Button>
                    </footer>
                  </Card>
                );
              })}
            </section>

            <div ref={sentinelRef} className="flex items-center justify-between py-sm">
              <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
                {STRINGS.common.showingCount} {formatNumber(visibleOffers.length)}{' '}
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
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="إضافة عرض جديد على منتج"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleSaveOffer} className="flex flex-col gap-md">
          <Select
            label={STRINGS.products.fields.name}
            value={selectedProductId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedProductId(id);
              const prod = products.find((p) => p.id === id);
              if (prod) {
                const base = prod.regularPrice ?? prod.price;
                setOfferPriceInput(String(Math.max(1, Math.round(base * 0.85))));
              }
            }}
            options={products.map((p) => ({
              value: p.id,
              label: `${p.name} (${formatCurrency(p.regularPrice ?? p.price)})`,
            }))}
          />
          <Input
            label="سعر العرض الجديد (ج.م)"
            type="number"
            value={offerPriceInput}
            onChange={(e) => setOfferPriceInput(e.target.value)}
          />
          <div className="flex items-center gap-sm pt-sm">
            <Button type="submit" variant="primary" size="lg" isLoading={isSaving} className="flex-1">
              {STRINGS.common.save}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setModalOpen(false)}>
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={removingOffer !== null}
        onClose={() => setRemovingOffer(null)}
        onConfirm={handleConfirmRemoveOffer}
        isLoading={isSaving}
        message={
          removingOffer
            ? `هل أنت متأكد من إنهاء وحذف العرض على «${removingOffer.name}»؟`
            : STRINGS.common.confirmDeleteGeneric
        }
      />
    </AdminLayout>
  );
}
