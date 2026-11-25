import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { STRINGS } from '@/constants/strings';
import { phoneToAuthEmail, sanitizePublicEmail } from '@/lib/phoneAuth';
import { callFunction, firebaseAuth } from '@/services/firebase/app';
import type { AuthSession, UserRole } from '@/types/domain';

export interface LoginPayload {
  phone: string;
  password: string;
}

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

function mapAdminAuthError(err: unknown): Error {
  const code = (err as { code?: string })?.code ?? '';
  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found'
  ) {
    return new Error(STRINGS.auth.invalidCredentials);
  }
  if (code === 'auth/user-disabled') {
    return new Error(STRINGS.auth.suspendedAccount);
  }
  if (code === 'auth/network-request-failed') {
    return new Error('تعذر الاتصال بخادم المصادقة. تأكد من تشغيل محاكيات Firebase المحلية.');
  }
  if (err instanceof Error) return err;
  return new Error(STRINGS.auth.invalidCredentials);
}

export async function loginAdmin(payload: LoginPayload): Promise<AuthSession> {
  const authEmail = phoneToAuthEmail(payload.phone);
  let credential;
  try {
    credential = await signInWithEmailAndPassword(firebaseAuth, authEmail, payload.password);
  } catch (err) {
    throw mapAdminAuthError(err);
  }

  let synced: SyncProfileResponse;
  try {
    synced = await callFunction<Record<string, never>, SyncProfileResponse>(
      'syncCurrentUserProfile',
      {},
    );
  } catch (err) {
    await signOut(firebaseAuth);
    throw err;
  }

  if (synced.user.role !== 'admin' && synced.user.role !== 'sub_admin') {
    await signOut(firebaseAuth);
    throw new Error(STRINGS.auth.notStaffError);
  }

  if (!synced.user.isActive) {
    await signOut(firebaseAuth);
    throw new Error(STRINGS.auth.suspendedAccount);
  }

  const tokenResult = await credential.user.getIdTokenResult(true);

  return {
    token: tokenResult.token,
    user: {
      id: synced.user.id,
      firebaseUid: synced.user.firebaseUid,
      name: synced.user.fullName,
      phone: synced.user.phone ?? payload.phone.trim(),
      email: sanitizePublicEmail(synced.user.email),
      role: synced.user.role,
      status: synced.user.isActive ? 'active' : 'suspended',
      isActive: synced.user.isActive,
      avatarKey: synced.user.avatarUrl ?? 'avatar-ahmed',
      area: synced.user.area,
      ordersCount: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
    },
  };
}
