import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotificationAlertStore } from '@/store/notificationAlertStore';
import { fetchNotifications, markAllNotificationsRead } from '../api/notificationsApi';

export const notificationKeys = {
  all: ['notifications'] as const,
};

export function useNotifications(enabled = true) {
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
      useNotificationAlertStore.getState().dismissLiveAlert();
    },
  });
}
