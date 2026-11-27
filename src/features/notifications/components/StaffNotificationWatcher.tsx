import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { activeCartKeys } from '@/features/carts/hooks/useActiveCarts';
import { customerKeys } from '@/features/customers/hooks/useCustomers';
import { notificationKeys, useNotifications } from '@/features/notifications/hooks/useNotifications';
import { orderKeys } from '@/features/orders/hooks/useOrders';
import { overviewKeys } from '@/features/overview/hooks/useOverview';
import { firestoreDb } from '@/services/firebase/app';
import { mapNotification, type FirestoreNotificationDoc } from '@/services/firebase/mappers';
import { useWebAuthStore } from '@/store/authStore';
import {
  playNotificationChime,
  resolveNotificationTargetRoute,
  unlockNotificationAudio,
  useNotificationAlertStore,
} from '@/store/notificationAlertStore';
import type { NotificationItem } from '@/types/domain';

const DEFAULT_DOCUMENT_TITLE = 'طازج — لوحة إدارة المتجر';

export function StaffNotificationWatcher() {
  const user = useWebAuthStore((s) => s.user);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const setLiveAlert = useNotificationAlertStore((s) => s.setLiveAlert);

  const isStaffSession = Boolean(
    user && (user.role === 'admin' || user.role === 'sub_admin') && user.isActive,
  );
  const { data: notifications = [] } = useNotifications(isStaffSession);

  const initializedRef = useRef(false);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const navigateRef = useRef(navigate);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    if (!isStaffSession || typeof window === 'undefined') return undefined;
    const unlock = () => unlockNotificationAudio();
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [isStaffSession]);

  useEffect(() => {
    const unreadCount = isStaffSession ? notifications.filter((n) => !n.isRead).length : 0;
    document.title =
      unreadCount > 0 ? `(${unreadCount}) إشعار جديد — ${DEFAULT_DOCUMENT_TITLE}` : DEFAULT_DOCUMENT_TITLE;
  }, [isStaffSession, notifications]);

  useEffect(() => {
    initializedRef.current = false;
    seenIdsRef.current = new Set();

    if (!isStaffSession) {
      setLiveAlert(null);
      return undefined;
    }

    const handleSnapshotItems = (items: NotificationItem[]) => {
      qc.setQueryData(notificationKeys.all, items);

      if (!initializedRef.current) {
        initializedRef.current = true;
        items.forEach((item) => seenIdsRef.current.add(item.id));
        return;
      }

      const freshUnread = items.filter(
        (item) => !item.isRead && !seenIdsRef.current.has(item.id),
      );
      items.forEach((item) => seenIdsRef.current.add(item.id));

      if (freshUnread.length === 0) return;

      const latest = freshUnread[0];
      const targetRoute = resolveNotificationTargetRoute(latest);

      setLiveAlert(latest);
      playNotificationChime();

      toast.info(`${latest.title}: ${latest.body}`, {
        duration: 12_000,
        action: targetRoute
          ? {
              label: 'عرض',
              onClick: () => navigateRef.current(targetRoute),
            }
          : undefined,
      });

      if (
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        try {
          const browserNotif = new Notification(latest.title, {
            body: latest.body,
            icon: '/images/tazaj/logo.jpeg',
            tag: latest.id,
            requireInteraction: true,
          });
          browserNotif.onclick = () => {
            window.focus();
            if (targetRoute) {
              navigateRef.current(targetRoute);
            }
            browserNotif.close();
          };
        } catch {
          // Ignore browser Notification runtime restrictions
        }
      }

      void qc.invalidateQueries({ queryKey: orderKeys.all });
      void qc.invalidateQueries({ queryKey: customerKeys.all });
      void qc.invalidateQueries({ queryKey: activeCartKeys.all });
      void qc.invalidateQueries({ queryKey: overviewKeys.all });
    };

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
        handleSnapshotItems(items);
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
            handleSnapshotItems(items);
          },
          () => undefined,
        );
      },
    );

    return () => {
      unsubscribe();
      fallbackUnsub?.();
    };
  }, [isStaffSession, qc, setLiveAlert, user?.id]);

  return null;
}
