import { callFunction } from '@/services/firebase/app';
import type { DashboardOverview } from '@/types/domain';

interface RawOverviewResponse extends Omit<DashboardOverview, 'topSellingProducts'> {
  topSellingProducts: {
    productId: string;
    name: string;
    categoryName: string;
    price: number;
    imageUrl: string | null;
    todayOrders: number;
  }[];
}

export async function fetchOverview(): Promise<DashboardOverview> {
  const res = await callFunction<Record<string, never>, RawOverviewResponse>(
    'getDashboardOverview',
    {},
  );
  return {
    ...res,
    topSellingProducts: res.topSellingProducts.map((item) => ({
      productId: item.productId,
      name: item.name,
      categoryName: item.categoryName,
      price: item.price,
      imageKey: item.imageUrl ?? 'prod-tomatoes',
      todayOrders: item.todayOrders,
    })),
  };
}
