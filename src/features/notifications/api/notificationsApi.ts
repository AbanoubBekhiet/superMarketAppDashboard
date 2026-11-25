import { adminListStaffNotifications, markAllMyNotificationsRead } from '@/dataconnect-generated';
import { dataConnect } from '@/services/firebase/app';
import { mapNotifications } from '@/services/firebase/mappers';
import type { NotificationItem } from '@/types/domain';

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const { data } = await adminListStaffNotifications(dataConnect);
  return mapNotifications(data.notifications);
}

export async function markAllNotificationsRead(): Promise<NotificationItem[]> {
  await markAllMyNotificationsRead(dataConnect);
  return fetchNotifications();
}
