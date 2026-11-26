import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import { mapNotification, type FirestoreNotificationDoc } from '@/services/firebase/mappers';
import type { NotificationItem } from '@/types/domain';

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const snap = await getDocs(
    query(
      collection(firestoreDb, 'notifications'),
      where('targetRole', '==', 'staff'),
      orderBy('createdAt', 'desc'),
      limit(50),
    ),
  );

  return snap.docs.map((d) => mapNotification(d.id, d.data() as FirestoreNotificationDoc));
}

export async function markAllNotificationsRead(): Promise<NotificationItem[]> {
  const snap = await getDocs(
    query(
      collection(firestoreDb, 'notifications'),
      where('targetRole', '==', 'staff'),
      orderBy('createdAt', 'desc'),
      limit(50),
    ),
  );

  const unreadDocs = snap.docs.filter((d) => !(d.data() as FirestoreNotificationDoc).isRead);
  if (unreadDocs.length > 0) {
    const batch = writeBatch(firestoreDb);
    unreadDocs.forEach((d) => {
      batch.update(doc(firestoreDb, 'notifications', d.id), { isRead: true });
    });
    await batch.commit();
  }

  return snap.docs.map((d) =>
    mapNotification(d.id, { ...(d.data() as FirestoreNotificationDoc), isRead: true }),
  );
}
