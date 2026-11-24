import { apiClient } from '@/services/api/client';
import type { AuthSession } from '@/types/domain';

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginAdmin(payload: LoginPayload): Promise<AuthSession> {
  const { data } = await apiClient.post<AuthSession>('/auth/login', payload);
  return data;
}
