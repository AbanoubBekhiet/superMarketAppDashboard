import { onAuthStateChanged, signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sanitizePublicEmail } from '@/lib/phoneAuth';
import { queryClient } from '@/lib/queryClient';
import { callFunction, firebaseAuth } from '@/services/firebase/app';
import type { AuthSession, User, UserRole } from '@/types/domain';

interface SyncProfileResponse {
  user: {
    id: string;
    firebaseUid: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    avatarUrl: string | null;
    role: UserRole;
    isActive: boolean;
    area: string;
  };
  claimsRefreshed: boolean;
}

interface WebAuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setSession: (session: AuthSession) => void;
  logout: () => Promise<void>;
}

let hydratePromise: Promise<void> | null = null;

export const useWebAuthStore = create<WebAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isHydrated: false,

      hydrate: async () => {
        if (get().isHydrated) return;
        if (hydratePromise) return hydratePromise;

        hydratePromise = new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
            unsubscribe();
            if (!fbUser) {
              set({ user: null, token: null, isHydrated: true });
              resolve();
              return;
            }

            try {
              const synced = await callFunction<Record<string, never>, SyncProfileResponse>(
                'syncCurrentUserProfile',
                {},
              );
              if (
                (synced.user.role !== 'admin' && synced.user.role !== 'sub_admin') ||
                !synced.user.isActive
              ) {
                await signOut(firebaseAuth).catch(() => undefined);
                set({ user: null, token: null, isHydrated: true });
                resolve();
                return;
              }
              const tokenResult = await fbUser.getIdTokenResult(true);
              set({
                token: tokenResult.token,
                user: {
                  id: synced.user.id,
                  firebaseUid: synced.user.firebaseUid,
                  name: synced.user.fullName,
                  phone: synced.user.phone ?? '',
                  email: sanitizePublicEmail(synced.user.email),
                  role: synced.user.role,
                  status: 'active',
                  isActive: true,
                  avatarKey: synced.user.avatarUrl ?? 'avatar-ahmed',
                  area: synced.user.area,
                  ordersCount: 0,
                  totalSpent: 0,
                  createdAt: new Date().toISOString(),
                },
                isHydrated: true,
              });
            } catch {
              await signOut(firebaseAuth).catch(() => undefined);
              set({ user: null, token: null, isHydrated: true });
            }
            resolve();
          });
        });

        return hydratePromise;
      },

      setSession: (session) => {
        queryClient.clear();
        set({ user: session.user, token: session.token, isHydrated: true });
      },

      logout: async () => {
        await signOut(firebaseAuth).catch(() => undefined);
        queryClient.clear();
        set({ user: null, token: null, isHydrated: true });
      },
    }),
    {
      name: 'tazaj-web-admin-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
