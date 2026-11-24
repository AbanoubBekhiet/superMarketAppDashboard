import { apiClient } from '@/services/api/client';
import type { Order, OrderStatus } from '@/types/domain';

export interface OrdersQueryParams {
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export async function fetchOrders(params: OrdersQueryParams = {}): Promise<Order[]> {
  const { data } = await apiClient.get<Order[]>('/orders', { params });
  return data;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  const { data } = await apiClient.patch<Order>(`/orders/${orderId}/status`, { status });
  return data;
}
