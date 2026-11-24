import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, UserAccountStatus } from '@/types/domain';
import {
  fetchCustomerOrders,
  fetchCustomers,
  updateCustomerStatus,
  type CustomersQueryParams,
} from '../api/customersApi';

export const customerKeys = {
  all: ['customers'] as const,
  list: (params: CustomersQueryParams) => ['customers', params] as const,
  orders: (customerId: string) => ['customers', customerId, 'orders'] as const,
};

export function useCustomers(params: CustomersQueryParams = {}) {
  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => fetchCustomers(params),
  });
}

export function useCustomerOrders(customerId: string | null) {
  return useQuery({
    queryKey: customerKeys.orders(customerId ?? ''),
    queryFn: () => fetchCustomerOrders(customerId!),
    enabled: Boolean(customerId),
  });
}

export function useUpdateCustomerStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserAccountStatus }) =>
      updateCustomerStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: customerKeys.all });
      const previous = qc.getQueriesData<User[]>({ queryKey: customerKeys.all });
      qc.setQueriesData<User[]>({ queryKey: customerKeys.all }, (old) =>
        old?.map((u) => (u.id === id ? { ...u, status } : u)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.previous.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
}
