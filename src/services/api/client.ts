import axios from 'axios';
import { env } from '@/lib/env';

let tokenGetter: () => string | null = () => null;

export function setAuthTokenGetter(getter: () => string | null): void {
  tokenGetter = getter;
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
