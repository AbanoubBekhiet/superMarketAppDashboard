import { apiClient } from '@/services/api/client';
import type { Order, User, UserAccountStatus } from '@/types/domain';

export interface CustomersQueryParams {
  status?: string;
  search?: string;
}

export async function fetchCustomers(params: CustomersQueryParams = {}): Promise<User[]> {
  const { data } = await apiClient.get<User[]>('/customers', { params });
  return data;
}

export async function updateCustomerStatus(
  id: string,
  status: UserAccountStatus,
): Promise<User> {
  const { data } = await apiClient.patch<User>(`/customers/${id}/status`, { status });
  return data;
}

export async function fetchCustomerOrders(customerId: string): Promise<Order[]> {
  const { data } = await apiClient.get<Order[]>(`/customers/${customerId}/orders`);
  return data;
}
