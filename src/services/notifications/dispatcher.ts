import { collection, doc, getDocs, query, where, writeBatch, addDoc } from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import { sendOneSignalPush } from '@/services/onesignal/client';
import type { OrderStatus } from '@/types/domain';

export type NotificationKind = 'order_update' | 'promotion' | 'system' | 'admin_alert';

export function buildOrderStatusNotification(
  orderCode: string,
  status: OrderStatus,
): { title: string; body: string } {
  switch (status) {
    case 'pending':
      return {
        title: 'تحديث حالة الطلب',
        body: `طلبك رقم ${orderCode} قيد المراجعة من فريق المتجر.`,
      };
    case 'processing':
      return {
        title: 'تم تأكيد طلبك',
        body: `تم تأكيد طلبك رقم ${orderCode} وجارٍ تجهيز الأصناف الطازجة الآن.`,
      };
    case 'on_the_way':
      return {
        title: 'طلبك في الطريق إليك',
        body: `المندوب انطلق لتوصيل طلبك رقم ${orderCode} إليك الآن.`,
      };
    case 'delivered':
      return {
        title: 'تم توصيل طلبك بنجاح',
        body: `تم تسليم طلبك رقم ${orderCode} بنجاح. نتمنى لك تجربة تسوق سعيدة مع طازج!`,
      };
    case 'cancelled':
      return {
        title: 'تم إلغاء الطلب',
        body: `تم إلغاء طلبك رقم ${orderCode}. إذا كان لديك استفسار تواصل معنا.`,
      };
  }
}

export async function notifyCustomerAndPush(params: {
  userId: string;
  title: string;
  body: string;
  type: NotificationKind;
  data?: Record<string, string>;
}): Promise<void> {
  const now = new Date().toISOString();
  await addDoc(collection(firestoreDb, 'notifications'), {
    userId: params.userId,
    targetRole: null,
    title: params.title,
    body: params.body,
    type: params.type,
    dataPayload: params.data ? JSON.stringify(params.data) : null,
    isRead: false,
    createdAt: now,
  });

  await sendOneSignalPush({
    title: params.title,
    body: params.body,
    externalIds: [params.userId],
    data: params.data,
  });
}

export async function notifyAllCustomersAndPush(params: {
  title: string;
  body: string;
  type: 'promotion' | 'system';
  audience?: 'all_customers' | 'active_buyers' | 'single_user';
  targetUserId?: string;
  data?: Record<string, string>;
}): Promise<{ ok: boolean; recipientsCount: number; pushOk: boolean; pushError?: string }> {
  const now = new Date().toISOString();
  let recipientIds: string[];

  if (params.audience === 'single_user' && params.targetUserId) {
    recipientIds = [params.targetUserId];
  } else {
    const custSnap = await getDocs(
      query(collection(firestoreDb, 'users'), where('role', '==', 'customer')),
    );
    const activeCustomers = custSnap.docs
      .map((d) => ({ id: d.id, ...(d.data() as { isActive?: boolean; deletedAt?: string | null }) }))
      .filter((c) => c.isActive !== false && !c.deletedAt);

    if (params.audience === 'active_buyers') {
      const ordersSnap = await getDocs(collection(firestoreDb, 'orders'));
      const buyerIds = new Set(
        ordersSnap.docs.map((o) => (o.data() as { userId?: string }).userId).filter(Boolean),
      );
      recipientIds = activeCustomers.filter((c) => buyerIds.has(c.id)).map((c) => c.id);
    } else {
      recipientIds = activeCustomers.map((c) => c.id);
    }
  }

  // Insert in-app notifications in batches of 450
  if (recipientIds.length > 0) {
    for (let i = 0; i < recipientIds.length; i += 450) {
      const batch = writeBatch(firestoreDb);
      const chunk = recipientIds.slice(i, i + 450);
      chunk.forEach((uid) => {
        const ref = doc(collection(firestoreDb, 'notifications'));
        batch.set(ref, {
          userId: uid,
          targetRole: null,
          title: params.title,
          body: params.body,
          type: params.type,
          dataPayload: params.data ? JSON.stringify(params.data) : null,
          isRead: false,
          createdAt: now,
        });
      });
      await batch.commit();
    }
  } else {
    await addDoc(collection(firestoreDb, 'notifications'), {
      userId: null,
      targetRole: 'customer',
      title: params.title,
      body: params.body,
      type: params.type,
      dataPayload: params.data ? JSON.stringify(params.data) : null,
      isRead: false,
      createdAt: now,
    });
  }

  const sendToAllSubscribed =
    params.audience === 'all_customers' ||
    (recipientIds.length === 0 && params.audience !== 'single_user');

  const pushResult = await sendOneSignalPush({
    title: params.title,
    body: params.body,
    externalIds: recipientIds.length > 0 ? recipientIds : undefined,
    sendToAllSubscribed,
    data: params.data,
  });

  return {
    ok: true,
    recipientsCount: recipientIds.length,
    pushOk: pushResult.ok,
    pushError: pushResult.errorMessage,
  };
}

export async function recordAuditLog(params: {
  actorId: string;
  actorName: string;
  action: string;
  entity: string;
  entityId: string;
}): Promise<void> {
  try {
    await addDoc(collection(firestoreDb, 'auditLogs'), {
      ...params,
      createdAt: new Date().toISOString(),
    });
  } catch {
    // Non-blocking audit logging
  }
}
