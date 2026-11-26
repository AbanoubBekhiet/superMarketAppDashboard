import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import {
  formatRelativeArabic,
  type FirestoreCategoryDoc,
  type FirestoreOrderDoc,
  type FirestoreProductDoc,
} from '@/services/firebase/mappers';
import { useWebAuthStore } from '@/store/authStore';
import type { ActivityItem, DashboardOverview } from '@/types/domain';

const ARABIC_WEEKDAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

interface AuditLogRow {
  id: string;
  action: string;
  entity: string;
  createdAt: string;
}

export async function fetchOverview(): Promise<DashboardOverview> {
  const actorRole = useWebAuthStore.getState().user?.role;

  const [ordersSnap, productsSnap, categoriesSnap, customersSnap, auditSnap] = await Promise.all([
    getDocs(query(collection(firestoreDb, 'orders'), orderBy('placedAt', 'desc'), limit(500))),
    getDocs(collection(firestoreDb, 'products')),
    getDocs(collection(firestoreDb, 'categories')),
    getDocs(query(collection(firestoreDb, 'users'), where('role', '==', 'customer'))),
    getDocs(query(collection(firestoreDb, 'auditLogs'), orderBy('createdAt', 'desc'), limit(20))).catch(
      () => null,
    ),
  ]);

  const orders = ordersSnap.docs.map((d) => ({ id: d.id, ...(d.data() as FirestoreOrderDoc) }));
  const products = productsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as FirestoreProductDoc) }))
    .filter((p) => !p.deletedAt);
  const categories = categoriesSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as FirestoreCategoryDoc) }))
    .filter((c) => !c.deletedAt);
  const customers = customersSnap.docs.filter(
    (d) => !(d.data() as { deletedAt?: string | null }).deletedAt,
  );
  const auditLogs: AuditLogRow[] =
    auditSnap?.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<AuditLogRow, 'id'>),
    })) ?? [];

  const nonCancelledOrders = orders.filter((o) => o.status !== 'cancelled');
  const totalRevenue = Number(nonCancelledOrders.reduce((acc, o) => acc + o.total, 0).toFixed(2));
  const activeOrders = orders.filter((o) =>
    ['pending', 'processing', 'on_the_way'].includes(o.status),
  );
  const processingOrders = orders.filter((o) => o.status === 'processing');

  const etas = orders
    .map((o) => o.etaMinutes)
    .filter((v): v is number => typeof v === 'number' && v > 0);
  const avgDeliveryMinutes =
    etas.length > 0 ? Math.round(etas.reduce((a, b) => a + b, 0) / etas.length) : 28;

  const lowStockProducts = products.filter(
    (p) => (p.isActive ?? true) && (p.stockQuantity ?? 1000) <= (p.lowStockThreshold ?? 10),
  );

  const now = new Date();
  const weeklyRevenue = Array.from({ length: 7 }).map((_, offsetFromEnd) => {
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() - (6 - offsetFromEnd));
    const dayKey = dayDate.toISOString().slice(0, 10);
    const dayName = ARABIC_WEEKDAYS[dayDate.getDay()];

    const dayOrders = nonCancelledOrders.filter(
      (o) => new Date(o.placedAt).toISOString().slice(0, 10) === dayKey,
    );
    const amount = Number(dayOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2));
    const shortLabel =
      amount >= 1000 ? `${(amount / 1000).toFixed(1)} ألف` : String(Math.round(amount));

    return {
      day: dayName,
      amount,
      shortLabel,
      highlight: offsetFromEnd === 6,
    };
  });

  const maxWeeklyAmount = Math.max(...weeklyRevenue.map((w) => w.amount), 0);
  if (maxWeeklyAmount > 0) {
    weeklyRevenue.forEach((point) => {
      point.highlight = point.amount === maxWeeklyAmount;
    });
  }
  const weeklyRevenueTotal = Number(
    weeklyRevenue.reduce((sum, point) => sum + point.amount, 0).toFixed(2),
  );

  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const productsMap = new Map(products.map((p) => [p.id, p]));
  const salesByCategory = new Map<string, { name: string; total: number }>();
  const productOrderCounts = new Map<string, number>();

  for (const order of nonCancelledOrders) {
    for (const item of order.items ?? []) {
      if (!item.productId) continue;
      productOrderCounts.set(
        item.productId,
        (productOrderCounts.get(item.productId) ?? 0) + item.quantity,
      );
      const prod = productsMap.get(item.productId);
      if (prod?.categoryId) {
        const catName = categoryMap.get(prod.categoryId) ?? prod.categoryName ?? '';
        const prev = salesByCategory.get(prod.categoryId) ?? { name: catName, total: 0 };
        prev.total += item.lineTotal ?? item.unitPrice * item.quantity;
        salesByCategory.set(prod.categoryId, prev);
      }
    }
  }

  const totalCatSales = Array.from(salesByCategory.values()).reduce((s, c) => s + c.total, 0);
  const categoryDistribution = Array.from(salesByCategory.entries())
    .map(([categoryId, info]) => ({
      categoryId,
      name: info.name,
      percentage: totalCatSales > 0 ? Math.round((info.total / totalCatSales) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const topSellingProducts = Array.from(productOrderCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, qty]) => {
      const p = productsMap.get(productId);
      if (!p) return null;
      return {
        productId: p.id,
        name: p.name,
        categoryName: categoryMap.get(p.categoryId) ?? p.categoryName ?? '',
        price: p.salePrice ?? p.price,
        imageKey: p.imageUrl ?? 'local://logo',
        todayOrders: qty,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const recentOrderActivities: ActivityItem[] = orders.slice(0, 3).map((order) => ({
    id: `ord-${order.id}`,
    title: `طلب جديد ${order.code}`,
    subtitle: `${order.customerNameSnapshot} — ${Math.round(order.total)} ج.م`,
    relativeTime: formatRelativeArabic(order.placedAt),
    tone: order.status === 'delivered' ? 'success' : 'neutral',
    icon: order.status === 'delivered' ? 'check' : 'bag',
  }));

  const safeAuditNote =
    actorRole === 'admin'
      ? auditLogs.slice(0, 3)
      : auditLogs.filter((l) => !l.entity.includes('admin')).slice(0, 3);

  const recentActivities: ActivityItem[] = [
    ...recentOrderActivities,
    ...safeAuditNote.map((l) => ({
      id: `log-${l.id}`,
      title: l.action,
      subtitle: l.entity,
      relativeTime: formatRelativeArabic(l.createdAt),
      tone: 'neutral' as const,
      icon: 'user' as const,
    })),
  ].slice(0, 6);

  return {
    totalRevenue,
    revenueGrowthPercent: 14.5,
    activeOrdersCount: activeOrders.length,
    processingOrdersCount: processingOrders.length,
    avgDeliveryMinutes,
    totalProductsCount: products.length,
    lowStockCount: lowStockProducts.length,
    totalCategoriesCount: categories.filter((c) => c.isActive !== false).length,
    totalCustomersCount: customers.length,
    weeklyRevenueTotal,
    weeklyRevenueGrowthPercent: 12.2,
    weeklyRevenue,
    categoryDistribution,
    recentActivities,
    topSellingProducts,
  };
}
