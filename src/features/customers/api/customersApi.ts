import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import {
  mapCustomer,
  mapOrder,
  type FirestoreOrderDoc,
  type FirestoreUserDoc,
} from '@/services/firebase/mappers';
import type { Order, User, UserAccountStatus } from '@/types/domain';

export interface CustomersQueryParams {
  status?: string;
  search?: string;
}

export async function fetchCustomers(params: CustomersQueryParams = {}): Promise<User[]> {
  const [usersSnap, ordersSnap] = await Promise.all([
    getDocs(query(collection(firestoreDb, 'users'), where('role', '==', 'customer'))),
    getDocs(query(collection(firestoreDb, 'orders'), orderBy('placedAt', 'desc'))),
  ]);

  const ordersByUser = new Map<string, { total: number; status: Order['status']; code: string }[]>();
  ordersSnap.docs.forEach((d) => {
    const o = d.data() as FirestoreOrderDoc;
    const list = ordersByUser.get(o.userId) ?? [];
    list.push({ total: o.total, status: o.status, code: o.code });
    ordersByUser.set(o.userId, list);
  });

  const mapped = usersSnap.docs
    .map((d) => ({ id: d.id, data: d.data() as FirestoreUserDoc }))
    .filter(({ data }) => !data.deletedAt)
    .sort((a, b) => (b.data.createdAt ?? '').localeCompare(a.data.createdAt ?? ''))
    .map(({ id, data }) => mapCustomer(id, data, ordersByUser.get(id) ?? []));

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

export async function updateCustomerStatus(
  id: string,
  status: UserAccountStatus,
): Promise<User> {
  const ref = doc(firestoreDb, 'users', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('العميل غير موجود');

  await updateDoc(ref, {
    isActive: status === 'active',
    updatedAt: new Date().toISOString(),
  });

  const customers = await fetchCustomers({});
  const updated = customers.find((c) => c.id === id);
  if (!updated) throw new Error('العميل غير موجود');
  return updated;
}

export interface UpdateCustomerPayload {
  fullName: string;
  phone: string;
  area: string;
}

export async function updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<User> {
  const ref = doc(firestoreDb, 'users', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('العميل غير موجود');

  await updateDoc(ref, {
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    area: payload.area.trim(),
    updatedAt: new Date().toISOString(),
  });

  const customers = await fetchCustomers({});
  const updated = customers.find((c) => c.id === id);
  if (updated) return updated;
  throw new Error('تعذر جلب بيانات العميل بعد التحديث');
}

export async function deleteCustomer(id: string): Promise<void> {
  await updateDoc(doc(firestoreDb, 'users', id), {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });
}

export async function fetchCustomerOrders(customerId: string): Promise<Order[]> {
  const snap = await getDocs(
    query(
      collection(firestoreDb, 'orders'),
      where('userId', '==', customerId),
      orderBy('placedAt', 'desc'),
    ),
  );
  return snap.docs.map((d) => mapOrder(d.id, d.data() as FirestoreOrderDoc));
}
