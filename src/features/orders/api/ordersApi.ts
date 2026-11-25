import { adminListOrders } from '@/dataconnect-generated';
import { callFunction, dataConnect } from '@/services/firebase/app';
import { mapOrder } from '@/services/firebase/mappers';
import type { Order, OrderStatus } from '@/types/domain';

export interface OrdersQueryParams {
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export async function fetchOrders(params: OrdersQueryParams = {}): Promise<Order[]> {
  const { data } = await adminListOrders(dataConnect, {
    status: params.status && params.status !== 'all' ? params.status : undefined,
    paymentStatus:
      params.paymentStatus && params.paymentStatus !== 'all' ? params.paymentStatus : undefined,
  });

  const mapped = data.orders.map(mapOrder);
  const search = params.search?.trim().toLowerCase();
  if (!search) return mapped;

  return mapped.filter(
    (order) =>
      order.code.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search),
  );
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  await callFunction<
    { orderId: string; status: OrderStatus },
    { id: string; status: OrderStatus; paymentStatus: string }
  >('updateOrderStatus', { orderId, status });

  const all = await fetchOrders({});
  const updated = all.find((o) => o.id === orderId);
  if (!updated) {
    throw new Error('تعذر العثور على الطلب بعد التحديث');
  }
  return updated;
}
