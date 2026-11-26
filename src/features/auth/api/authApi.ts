import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { STRINGS } from '@/constants/strings';
import { phoneToAuthEmail, sanitizePublicEmail } from '@/lib/phoneAuth';
import { firebaseAuth, firestoreDb } from '@/services/firebase/app';
import type { AuthSession, UserRole } from '@/types/domain';

export interface LoginPayload {
  phone: string;
  password: string;
}

interface FirestoreUserDoc {
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
    return new Error('تعذر الاتصال بخادم المصادقة. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
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

  let profile: FirestoreUserDoc | null;
  try {
    const snap = await getDoc(doc(firestoreDb, 'users', credential.user.uid));
    profile = snap.exists() ? (snap.data() as FirestoreUserDoc) : null;
  } catch (err) {
    await signOut(firebaseAuth).catch(() => undefined);
    throw err;
  }

  if (!profile) {
    await signOut(firebaseAuth);
    throw new Error(STRINGS.auth.notStaffError);
  }

  if (profile.role !== 'admin' && profile.role !== 'sub_admin') {
    await signOut(firebaseAuth);
    throw new Error(STRINGS.auth.notStaffError);
  }

  if (!profile.isActive || profile.deletedAt) {
    await signOut(firebaseAuth);
    throw new Error(STRINGS.auth.suspendedAccount);
  }

  await updateDoc(doc(firestoreDb, 'users', credential.user.uid), {
    lastLoginAt: new Date().toISOString(),
  }).catch(() => undefined);

  const token = await credential.user.getIdToken();

  return {
    token,
    user: {
      id: credential.user.uid,
      firebaseUid: credential.user.uid,
      name: profile.fullName,
      phone: profile.phone ?? payload.phone.trim(),
      email: sanitizePublicEmail(profile.email ?? credential.user.email),
      role: profile.role,
      status: 'active',
      isActive: true,
      avatarKey: profile.avatarUrl ?? 'avatar-ahmed',
      area: profile.area ?? 'الإسكندرية',
      ordersCount: 0,
      totalSpent: 0,
      createdAt: profile.createdAt ?? new Date().toISOString(),
    },
  };
}
