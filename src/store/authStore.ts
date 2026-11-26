import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sanitizePublicEmail } from '@/lib/phoneAuth';
import { queryClient } from '@/lib/queryClient';
import { firebaseAuth, firestoreDb } from '@/services/firebase/app';
import type { AuthSession, User, UserRole } from '@/types/domain';

interface FirestoreUserDoc {
  id?: string;
  firebaseUid?: string;
  fullName: string;
  phone?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  isActive: boolean;
  area?: string;
  deletedAt?: string | null;
  createdAt?: string;
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
              const userSnap = await getDoc(doc(firestoreDb, 'users', fbUser.uid));
              const profile = userSnap.exists()
                ? (userSnap.data() as FirestoreUserDoc)
                : null;

              if (
                !profile ||
                (profile.role !== 'admin' && profile.role !== 'sub_admin') ||
                !profile.isActive ||
                Boolean(profile.deletedAt)
              ) {
                await signOut(firebaseAuth).catch(() => undefined);
                set({ user: null, token: null, isHydrated: true });
                resolve();
                return;
              }

              const token = await fbUser.getIdToken();
              set({
                token,
                user: {
                  id: fbUser.uid,
                  firebaseUid: fbUser.uid,
                  name: profile.fullName,
                  phone: profile.phone ?? '',
                  email: sanitizePublicEmail(profile.email ?? fbUser.email),
                  role: profile.role,
                  status: 'active',
                  isActive: true,
                  avatarKey: profile.avatarUrl ?? 'avatar-ahmed',
                  area: profile.area ?? 'الإسكندرية',
                  ordersCount: 0,
                  totalSpent: 0,
                  createdAt: profile.createdAt ?? new Date().toISOString(),
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
