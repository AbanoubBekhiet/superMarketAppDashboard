import { adminGetCustomerOrders, adminListCustomers } from '@/dataconnect-generated';
import { callFunction, dataConnect } from '@/services/firebase/app';
import { mapCustomer } from '@/services/firebase/mappers';
import type { Order, OrderStatus, PaymentStatus, User, UserAccountStatus } from '@/types/domain';

export interface CustomersQueryParams {
  status?: string;
  search?: string;
}

export async function fetchCustomers(params: CustomersQueryParams = {}): Promise<User[]> {
  const { data } = await adminListCustomers(dataConnect);
  const mapped = data.users.map(mapCustomer);

  return mapped.filter((customer) => {
    if (params.status && params.status !== 'all' && customer.status !== params.status) {
      return false;
    }
    const q = params.search?.trim().toLowerCase();
    if (q) {
      return (
        customer.name.toLowerCase().includes(q) ||
        customer.phone.toLowerCase().includes(q) ||
        customer.area.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

function sameUuid(a: string, b: string): boolean {
  return a.replace(/-/g, '').toLowerCase() === b.replace(/-/g, '').toLowerCase();
}

export async function updateCustomerStatus(
  id: string,
  status: UserAccountStatus,
): Promise<User> {
  await callFunction<{ customerId: string; isActive: boolean }, { id: string; isActive: boolean }>(
    'setCustomerStatus',
    { customerId: id, isActive: status === 'active' },
  );
  const customers = await fetchCustomers({});
  const updated = customers.find((c) => sameUuid(c.id, id));
  if (!updated) throw new Error('العميل غير موجود');
  return updated;
}

export interface UpdateCustomerPayload {
  fullName: string;
  phone: string;
  area: string;
}

export async function updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<User> {
  await callFunction<
    { customerId: string; fullName: string; phone: string; area: string },
    { id: string; updated: boolean }
  >('updateCustomerByStaff', {
    customerId: id,
    fullName: payload.fullName,
    phone: payload.phone,
    area: payload.area,
  });
  const customers = await fetchCustomers({});
  const updated = customers.find((c) => sameUuid(c.id, id));
  if (updated) return updated;
  throw new Error('تعذر جلب بيانات العميل بعد التحديث');
}

export async function deleteCustomer(id: string): Promise<void> {
  await callFunction<{ customerId: string }, { id: string; deleted: boolean }>(
    'softDeleteCustomer',
    { customerId: id },
  );
}

export async function fetchCustomerOrders(customerId: string): Promise<Order[]> {
  const { data } = await adminGetCustomerOrders(dataConnect, { customerId });
  return data.orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    code: o.code,
    customerId,
    customerName: '',
    customerArea: '',
    customerAddress: '',
    itemsCount: o.orderItems_on_order.length,
    items: [],
    subtotal: o.total,
    deliveryFee: 0,
    discount: 0,
    total: o.total,
    deliverySlot: 'instant',
    paymentMethod: o.paymentStatus === 'paid' ? 'card' : 'cod',
    paymentStatus: o.paymentStatus as PaymentStatus,
    status: o.status as OrderStatus,
    placedAt: o.placedAt,
    createdAt: o.placedAt,
  }));
}
