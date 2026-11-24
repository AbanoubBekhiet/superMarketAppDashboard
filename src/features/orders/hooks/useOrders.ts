import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { overviewKeys } from '@/features/overview/hooks/useOverview';
import type { Order, OrderStatus } from '@/types/domain';
import { fetchOrders, updateOrderStatus, type OrdersQueryParams } from '../api/ordersApi';

export const orderKeys = {
  all: ['orders'] as const,
  list: (params: OrdersQueryParams) => ['orders', params] as const,
};

export function useOrders(params: OrdersQueryParams = {}) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => fetchOrders(params),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onMutate: async ({ orderId, status }) => {
      await qc.cancelQueries({ queryKey: orderKeys.all });
      const previous = qc.getQueriesData<Order[]>({ queryKey: orderKeys.all });
      qc.setQueriesData<Order[]>({ queryKey: orderKeys.all }, (old) =>
        old?.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.previous.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: orderKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}
