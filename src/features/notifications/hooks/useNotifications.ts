import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import { mapNotification, type FirestoreNotificationDoc } from '@/services/firebase/mappers';
import { fetchNotifications, markAllNotificationsRead } from '../api/notificationsApi';

export const notificationKeys = {
  all: ['notifications'] as const,
};

export function useNotifications(enabled = true) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;

    const primaryQuery = query(
      collection(firestoreDb, 'notifications'),
      where('targetRole', '==', 'staff'),
      orderBy('createdAt', 'desc'),
      limit(50),
    );
    const fallbackQuery = query(
      collection(firestoreDb, 'notifications'),
      where('targetRole', '==', 'staff'),
    );

    let fallbackUnsub: (() => void) | null = null;
    const unsubscribe = onSnapshot(
      primaryQuery,
      (snap) => {
        const items = snap.docs.map((d) =>
          mapNotification(d.id, d.data() as FirestoreNotificationDoc),
        );
        qc.setQueryData(notificationKeys.all, items);
      },
      () => {
        if (fallbackUnsub) return;
        fallbackUnsub = onSnapshot(
          fallbackQuery,
          (snap) => {
            const items = snap.docs
              .map((d) => mapNotification(d.id, d.data() as FirestoreNotificationDoc))
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(0, 50);
            qc.setQueryData(notificationKeys.all, items);
          },
          () => undefined,
        );
      },
    );

    return () => {
      unsubscribe();
      fallbackUnsub?.();
    };
  }, [enabled, qc]);

  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: fetchNotifications,
    enabled,
    staleTime: 60_000,
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: (updated) => {
      qc.setQueryData(notificationKeys.all, updated);
    },
  });
}
