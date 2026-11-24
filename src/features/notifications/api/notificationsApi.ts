import { apiClient } from '@/services/api/client';
import type { NotificationItem } from '@/types/domain';

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const { data } = await apiClient.get<NotificationItem[]>('/notifications');
  return data;
}

export async function markAllNotificationsRead(): Promise<NotificationItem[]> {
  const { data } = await apiClient.post<NotificationItem[]>('/notifications/read-all');
  return data;
}
