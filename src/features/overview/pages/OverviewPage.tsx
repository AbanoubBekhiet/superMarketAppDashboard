import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Package,
  ShoppingBag,
  Truck,
  UserPlus,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CardSkeleton, EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useOverview } from '@/features/overview/hooks/useOverview';
import { formatCurrency, formatNumber } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import { colors } from '@/theme/tokens';

export function OverviewPage() {
  const [search, setSearch] = useState('');
  const { data: overview, isLoading, isError, refetch } = useOverview();

  const filteredActivities = useMemo(() => {
    if (!overview) return [];
    const q = search.trim().toLowerCase();
    if (!q) return overview.recentActivities;
    return overview.recentActivities.filter(
      (a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q),
    );
  }, [overview, search]);

  const filteredTopProducts = useMemo(() => {
    if (!overview) return [];
    const q = search.trim().toLowerCase();
    if (!q) return overview.topSellingProducts;
    return overview.topSellingProducts.filter((p) => p.name.toLowerCase().includes(q));
  }, [overview, search]);

  return (
    <AdminLayout
      title={STRINGS.overview.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.overview.searchPlaceholder}
    >
      {isLoading ? (
        <CardSkeleton count={3} />
      ) : isError || !overview ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <div className="flex flex-col gap-xl">
          {/* Summary KPI Cards */}
          <section
            aria-label={STRINGS.overview.pageTitle}
            className="grid grid-cols-1 md:grid-cols-3 gap-lg items-stretch"
          >
            <Card className="flex flex-col justify-between gap-md">
              <div className="flex items-center justify-between">
                <span className="font-title text-title-sm text-on-surface-muted">
                  {STRINGS.overview.totalRevenue}
                </span>
                <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                  <Wallet className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-sm">
                <span className="font-headline text-display-lg-mobile text-on-surface tabular-nums">
                  {formatCurrency(overview.totalRevenue)}
                </span>
              </div>
            </Card>

            <Card className="flex flex-col justify-between gap-md">
              <div className="flex items-center justify-between">
                <span className="font-title text-title-sm text-on-surface-muted">
                  {STRINGS.overview.activeOrders}
                </span>
                <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                  <Truck className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-sm">
                <span className="font-headline text-display-lg-mobile text-on-surface tabular-nums">
                  {formatNumber(overview.activeOrdersCount)}
                </span>
                <Badge variant="warning">
                  {formatNumber(overview.processingOrdersCount)} {STRINGS.overview.processingSuffix}
                </Badge>
              </div>
            </Card>

            <Card className="flex flex-col justify-between gap-md">
              <div className="flex items-center justify-between">
                <span className="font-title text-title-sm text-on-surface-muted">
                  {STRINGS.overview.totalProducts}
                </span>
                <span className="w-10 h-10 rounded-md bg-mint-surface text-primary flex items-center justify-center">
                  <Package className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-sm">
                <span className="font-headline text-display-lg-mobile text-on-surface tabular-nums">
                  {formatNumber(overview.totalProductsCount)}
                </span>
              </div>
              <span className="font-body text-body-sm text-on-surface-subtle tabular-nums">
                {STRINGS.overview.categoriesSummaryPrefix}{' '}
                {formatNumber(overview.totalCategoriesCount)}{' '}
                {STRINGS.overview.categoriesSummarySuffix}
              </span>
            </Card>
          </section>

          {/* Financial Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-stretch">
            <Card className="lg:col-span-8 flex flex-col gap-base">
              <header className="flex items-center justify-between pb-sm border-b border-outline-subtle">
                <div className="flex flex-col gap-xs">
                  <h2 className="font-headline text-title-lg text-on-surface">
                    {STRINGS.overview.weeklyRevenueTitle}
                  </h2>
                  <span className="font-body text-body-sm text-on-surface-subtle tabular-nums">
                    {STRINGS.overview.weeklyRevenueSubtitlePrefix}{' '}
                    {formatCurrency(overview.weeklyRevenueTotal)} (+
                    {formatNumber(overview.weeklyRevenueGrowthPercent)}%)
                  </span>
                </div>
                <Badge variant="mint">{STRINGS.overview.last7Days}</Badge>
              </header>

              <div className="h-56 w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={overview.weeklyRevenue}
                    margin={{ top: 12, right: 8, left: 8, bottom: 4 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: colors.onSurfaceSubtle, fontFamily: 'Tajawal', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={52}
                      tickFormatter={(v: number) =>
                        `${formatNumber(Number((v / 1000).toFixed(1)))} ${STRINGS.overview.thousandUnit}`
                      }
                      tick={{ fill: colors.onSurfaceMuted, fontFamily: 'Cairo', fontSize: 11 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(209, 237, 211, 0.25)' }}
                      contentStyle={{
                        backgroundColor: colors.surfaceCard,
                        borderColor: colors.outlineSubtle,
                        borderRadius: '12px',
                        fontFamily: 'Tajawal',
                        direction: 'rtl',
                        textAlign: 'right',
                      }}
                      formatter={(value) => [
                        formatCurrency(Number(value ?? 0)),
                        STRINGS.overview.totalRevenue,
                      ]}
                    />
                    <Bar dataKey="amount" radius={[10, 10, 0, 0]} maxBarSize={42}>
                      {overview.weeklyRevenue.map((entry, idx) => (
                        <Cell
                          key={entry.day}
                          fill={
                            entry.highlight
                              ? colors.primary
                              : idx % 2 === 1
                                ? colors.secondary
                                : colors.mintSurface
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="lg:col-span-4 flex flex-col justify-between gap-base">
              <header className="pb-sm border-b border-outline-subtle">
                <h2 className="font-headline text-title-lg text-on-surface">
                  {STRINGS.overview.salesByCategoryTitle}
                </h2>
              </header>

              <div className="flex flex-col gap-md">
                {overview.categoryDistribution.map((item, idx) => {
                  const barColor =
                    idx === 0
                      ? 'bg-primary'
                      : idx === 1
                        ? 'bg-secondary'
                        : 'bg-soft-accent';
                  return (
                    <div key={item.categoryId} className="flex flex-col gap-xs">
                      <div className="flex justify-between">
                        <span className="font-title text-title-sm text-on-surface">{item.name}</span>
                        <span className="font-label text-label-sm text-primary tabular-nums">
                          {formatNumber(item.percentage)}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-surface-subtle overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          {/* Recent Activity & Top Selling */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
            <Card className="lg:col-span-7 flex flex-col gap-base">
              <header className="flex items-center justify-between pb-sm border-b border-outline-subtle">
                <h2 className="font-headline text-title-lg text-on-surface">
                  {STRINGS.overview.recentActivitiesTitle}
                </h2>
                <Link
                  to="/orders"
                  className="font-label text-label-md text-primary hover:underline"
                >
                  {STRINGS.overview.viewAllOrders}
                </Link>
              </header>

              {filteredActivities.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="divide-y divide-outline-subtle">
                  {filteredActivities.map((act) => {
                    const Icon =
                      act.icon === 'warning'
                        ? AlertTriangle
                        : act.icon === 'check'
                          ? CheckCircle2
                          : act.icon === 'user'
                            ? UserPlus
                            : ShoppingBag;
                    const badgeBg =
                      act.tone === 'warning'
                        ? 'bg-warning-container text-on-warning-container'
                        : act.tone === 'neutral'
                          ? 'bg-surface-subtle text-on-surface'
                          : 'bg-mint-surface text-primary';
                    return (
                      <div key={act.id} className="py-md flex items-center justify-between gap-md">
                        <div className="flex items-center gap-md">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${badgeBg}`}
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </span>
                          <div className="flex flex-col">
                            <span className="font-title text-title-sm text-on-surface">
                              {act.title}
                            </span>
                            <span className="font-body text-body-sm text-on-surface-subtle">
                              {act.subtitle}
                            </span>
                          </div>
                        </div>
                        <span className="font-body text-body-sm text-on-surface-subtle tabular-nums shrink-0">
                          {act.relativeTime}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            <Card className="lg:col-span-5 flex flex-col gap-base">
              <header className="flex items-center justify-between pb-sm border-b border-outline-subtle">
                <h2 className="font-headline text-title-lg text-on-surface">
                  {STRINGS.overview.topSellingTitle}
                </h2>
                <Link
                  to="/products"
                  className="font-label text-label-md text-primary hover:underline"
                >
                  {STRINGS.overview.manageProducts}
                </Link>
              </header>

              {filteredTopProducts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-md">
                  {filteredTopProducts.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between gap-md">
                      <div className="flex items-center gap-md">
                        <img
                          src={getImageUrl(item.imageKey)}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover bg-surface shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-title text-title-sm text-on-surface">
                            {item.name}
                          </span>
                          <span className="font-body text-body-sm text-on-surface-subtle tabular-nums">
                            {formatNumber(item.todayOrders)} {STRINGS.overview.todayOrdersSuffix}
                          </span>
                        </div>
                      </div>
                      <span className="font-headline text-title-sm text-primary tabular-nums">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
