import { apiClient } from '@/services/api/client';
import type { DashboardOverview } from '@/types/domain';

export async function fetchOverview(): Promise<DashboardOverview> {
  const { data } = await apiClient.get<DashboardOverview>('/dashboard/overview');
  return data;
}
