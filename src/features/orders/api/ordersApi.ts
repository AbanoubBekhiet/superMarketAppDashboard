import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import { mapOrder, type FirestoreOrderDoc } from '@/services/firebase/mappers';
import {
  buildOrderStatusNotification,
  notifyCustomerAndPush,
  recordAuditLog,
} from '@/services/notifications/dispatcher';
import { useWebAuthStore } from '@/store/authStore';
import type { Order, OrderStatus } from '@/types/domain';

export interface OrdersQueryParams {
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export async function fetchOrders(params: OrdersQueryParams = {}): Promise<Order[]> {
  const snap = await getDocs(
    query(collection(firestoreDb, 'orders'), orderBy('placedAt', 'desc')),
  );

  let mapped = snap.docs.map((d) => mapOrder(d.id, d.data() as FirestoreOrderDoc));

  const missingCoordCustomerIds = Array.from(
    new Set(
      mapped
        .filter((o) => o.customerId && o.customerLatitude == null && o.customerLongitude == null)
        .map((o) => o.customerId),
    ),
  );
  if (missingCoordCustomerIds.length > 0) {
    const coordEntries = await Promise.all(
      missingCoordCustomerIds.map(async (customerId) => {
        const [uSnap, addrSnap] = await Promise.all([
          getDoc(doc(firestoreDb, 'users', customerId)).catch(() => null),
          getDocs(collection(firestoreDb, 'users', customerId, 'addresses')).catch(() => null),
        ]);
        const uData = uSnap?.exists()
          ? (uSnap.data() as { latitude?: number | null; longitude?: number | null })
          : null;
        const addrs = addrSnap?.docs.map((d) => d.data() as {
          isDefault?: boolean;
          latitude?: number | null;
          longitude?: number | null;
        }) ?? [];
        const primaryAddr = addrs.find((a) => a.isDefault) ?? addrs[0];
        return [
          customerId,
          {
            latitude: primaryAddr?.latitude ?? uData?.latitude ?? null,
            longitude: primaryAddr?.longitude ?? uData?.longitude ?? null,
          },
        ] as const;
      }),
    );
    const coordsByUserId = new Map(coordEntries);
    mapped = mapped.map((o) => {
      const coords = coordsByUserId.get(o.customerId);
      if (!coords) return o;
      return {
        ...o,
        customerLatitude: o.customerLatitude ?? coords.latitude,
        customerLongitude: o.customerLongitude ?? coords.longitude,
      };
    });
  }

  if (params.status && params.status !== 'all') {
    mapped = mapped.filter((o) => o.status === params.status);
  }
  if (params.paymentStatus && params.paymentStatus !== 'all') {
    mapped = mapped.filter((o) => o.paymentStatus === params.paymentStatus);
  }

  const search = params.search?.trim().toLowerCase();
  if (!search) return mapped;

  return mapped.filter(
    (order) =>
      order.id.toLowerCase().includes(search) ||
      order.code.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search),
  );
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  const orderRef = doc(firestoreDb, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) {
    throw new Error('الطلب غير موجود');
  }

  const current = snap.data() as FirestoreOrderDoc;
  const now = new Date().toISOString();
  const actor = useWebAuthStore.getState().user;

  const paymentStatus =
    status === 'delivered'
      ? 'paid'
      : status === 'cancelled' && current.paymentStatus === 'paid'
        ? 'refunded'
        : current.paymentStatus ?? 'cod';

  const nextHistory = [
    ...(current.statusHistory ?? []),
    {
      id: `hist-${Date.now()}`,
      fromStatus: current.status,
      toStatus: status,
      note: `تغيير الحالة إلى ${status}`,
      changedByName: actor?.name ?? 'الإدارة',
      createdAt: now,
    },
  ];

  await updateDoc(orderRef, {
    status,
    paymentStatus,
    deliveredAt: status === 'delivered' ? now : (current.deliveredAt ?? null),
    statusHistory: nextHistory,
    updatedAt: now,
  });

  if (current.userId) {
    const tpl = buildOrderStatusNotification(current.code, status);
    void notifyCustomerAndPush({
      userId: current.userId,
      title: tpl.title,
      body: tpl.body,
      type: 'order_update',
      data: { orderId, status },
    }).catch(() => undefined);
  }

  if (actor) {
    void recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      action: `تحديث حالة الطلب إلى ${status}`,
      entity: 'order',
      entityId: orderId,
    });
  }

  return mapOrder(orderId, {
    ...current,
    status,
    paymentStatus,
    deliveredAt: status === 'delivered' ? now : (current.deliveredAt ?? null),
    statusHistory: nextHistory,
  });
}
