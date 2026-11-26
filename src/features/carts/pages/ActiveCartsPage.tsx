import { ShoppingBag, ShoppingCart, Wallet } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CardSkeleton, EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useActiveCarts } from '@/features/carts/hooks/useActiveCarts';
import { formatCurrency, formatNumber, formatShortDate } from '@/lib/format';
import { getImageUrl } from '@/lib/images';

export function ActiveCartsPage() {
  const [search, setSearch] = useState('');
  const { data: carts = [], isLoading, isError, refetch } = useActiveCarts(search);

  const summary = useMemo(() => {
    const totalCarts = carts.length;
    const totalItems = carts.reduce((sum, c) => sum + c.itemsCount, 0);
    const totalValue = carts.reduce((sum, c) => sum + c.subtotal, 0);
    return { totalCarts, totalItems, totalValue };
  }, [carts]);

  return (
    <AdminLayout
      title={STRINGS.activeCarts.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.activeCarts.searchPlaceholder}
    >
      <div className="flex flex-col gap-lg">
        <p className="font-body text-body-md text-on-surface-muted">
          {STRINGS.activeCarts.subtitle}
        </p>

        {/* Summary KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg items-stretch">
          <Card className="flex flex-col justify-between gap-sm">
            <div className="flex items-center justify-between">
              <span className="font-title text-title-sm text-on-surface-muted">
                {STRINGS.activeCarts.cartsCountLabel}
              </span>
              <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              </span>
            </div>
            <span className="font-headline text-display-lg-mobile text-on-surface tabular-nums">
              {formatNumber(summary.totalCarts)}
            </span>
          </Card>

          <Card className="flex flex-col justify-between gap-sm">
            <div className="flex items-center justify-between">
              <span className="font-title text-title-sm text-on-surface-muted">
                {STRINGS.activeCarts.totalItemsLabel}
              </span>
              <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </span>
            </div>
            <span className="font-headline text-display-lg-mobile text-on-surface tabular-nums">
              {formatNumber(summary.totalItems)}
            </span>
          </Card>

          <Card className="flex flex-col justify-between gap-sm">
            <div className="flex items-center justify-between">
              <span className="font-title text-title-sm text-on-surface-muted">
                {STRINGS.activeCarts.potentialValueLabel}
              </span>
              <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                <Wallet className="w-5 h-5" aria-hidden="true" />
              </span>
            </div>
            <span className="font-headline text-display-lg-mobile text-primary tabular-nums">
              {formatCurrency(summary.totalValue)}
            </span>
          </Card>
        </section>

        {isLoading ? (
          <CardSkeleton count={3} />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : carts.length === 0 ? (
          <EmptyState
            title={STRINGS.activeCarts.emptyTitle}
            subtitle={STRINGS.activeCarts.emptySubtitle}
          />
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-stretch">
            {carts.map((cart) => (
              <Card key={cart.userId} className="flex flex-col justify-between gap-md">
                <header className="flex items-start justify-between gap-md pb-sm border-b border-outline-subtle">
                  <div className="flex flex-col gap-xs min-w-0">
                    <h2 className="font-headline text-title-md text-on-surface truncate">
                      {cart.customerName}
                    </h2>
                    <div className="flex items-center gap-sm flex-wrap text-body-sm text-on-surface-muted">
                      {cart.customerPhone ? (
                        <span dir="ltr" className="tabular-nums">
                          {cart.customerPhone}
                        </span>
                      ) : null}
                      {cart.customerArea ? <span>• {cart.customerArea}</span> : null}
                      {cart.updatedAt ? <span>• {formatShortDate(cart.updatedAt)}</span> : null}
                    </div>
                  </div>
                  <Badge variant="mint">
                    {formatNumber(cart.itemsCount)} {STRINGS.activeCarts.itemsSuffix}
                  </Badge>
                </header>

                <div className="flex flex-col gap-xs">
                  {cart.items.map((item, idx) => (
                    <div
                      key={`${item.productId}-${item.weightOptionId ?? idx}`}
                      className="flex items-center justify-between gap-sm py-xs"
                    >
                      <div className="flex items-center gap-sm min-w-0">
                        <img
                          src={getImageUrl(item.imageKey)}
                          alt={item.name}
                          className="w-10 h-10 rounded-md object-cover bg-surface shrink-0"
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

                <footer className="pt-sm border-t border-outline-subtle flex items-center justify-between">
                  <span className="font-title text-title-sm text-on-surface-muted">
                    {STRINGS.activeCarts.subtotalLabel}
                  </span>
                  <span className="font-headline text-title-lg text-primary tabular-nums">
                    {formatCurrency(cart.subtotal)}
                  </span>
                </footer>
              </Card>
            ))}
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
