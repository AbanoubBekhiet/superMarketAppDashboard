import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthTokenGetter } from '@/services/api/client';
import type { AuthSession, User } from '@/types/domain';

interface WebAuthState {
  user: User | null;
  token: string | null;
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

export const useWebAuthStore = create<WebAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (session) => set({ user: session.user, token: session.token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'tazaj-web-admin-auth',
    },
  ),
);

setAuthTokenGetter(() => useWebAuthStore.getState().token);
