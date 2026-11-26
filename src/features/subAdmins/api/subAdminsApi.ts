import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { normalizePhoneNumber, phoneToAuthEmail, sanitizePublicEmail } from '@/lib/phoneAuth';
import { createSecondaryAuthUser, firestoreDb } from '@/services/firebase/app';
import { type FirestoreUserDoc } from '@/services/firebase/mappers';
import { notifyCustomerAndPush, recordAuditLog } from '@/services/notifications/dispatcher';
import { useWebAuthStore } from '@/store/authStore';
import type { User } from '@/types/domain';

export interface CreateSubAdminPayload {
  fullName: string;
  phone: string;
  email?: string | null;
  password: string;
  department: string;
  permissionsNotes?: string;
}

export interface UpdateSubAdminPayload {
  userId: string;
  fullName: string;
  phone: string;
  department: string;
  permissionsNotes?: string;
}

export async function fetchSubAdmins(): Promise<User[]> {
  const snap = await getDocs(
    query(collection(firestoreDb, 'users'), where('role', 'in', ['admin', 'sub_admin'])),
  );

  return snap.docs
    .map((d) => ({ id: d.id, data: d.data() as FirestoreUserDoc }))
    .filter(({ data }) => !data.deletedAt)
    .sort((a, b) => (a.data.role === 'admin' ? -1 : b.data.role === 'admin' ? 1 : 0))
    .map(({ id, data }) => ({
      id,
      firebaseUid: data.firebaseUid,
      name: data.fullName,
      phone: data.phone ?? 'غير مسجل',
      email: sanitizePublicEmail(data.email),
      role: data.role,
      status: data.isActive ? 'active' : 'suspended',
      isActive: data.isActive,
      area: data.area ?? 'الإسكندرية',
      ordersCount: 0,
      totalSpent: 0,
      createdAt: data.createdAt ?? new Date().toISOString(),
      adminProfile: data.adminProfile ?? null,
    }));
}

export async function createSubAdmin(payload: CreateSubAdminPayload): Promise<{ id: string }> {
  const normalizedPhone = normalizePhoneNumber(payload.phone);
  const authEmail = phoneToAuthEmail(normalizedPhone);
  const now = new Date().toISOString();
  const actor = useWebAuthStore.getState().user;

  let uid: string;
  try {
    uid = await createSecondaryAuthUser(authEmail, payload.password);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? '';
    if (code === 'auth/email-already-in-use') {
      throw new Error('رقم الهاتف مسجل بالفعل لحساب آخر', { cause: err });
    }
    throw err;
  }

  await setDoc(doc(firestoreDb, 'users', uid), {
    id: uid,
    firebaseUid: uid,
    fullName: payload.fullName.trim(),
    phone: normalizedPhone,
    email: payload.email?.trim() ? payload.email.trim() : null,
    avatarUrl: 'avatar-ahmed',
    role: 'sub_admin',
    isActive: true,
    area: 'الإسكندرية',
    adminProfile: {
      id: `ap-${uid.slice(0, 8)}`,
      department: payload.department.trim(),
      permissionsNotes: payload.permissionsNotes?.trim() || null,
      createdByName: actor?.name ?? null,
    },
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  });

  if (actor) {
    void recordAuditLog({
      actorId: actor.id,
      actorName: actor.name,
      action: 'إنشاء حساب مشرف فرعي',
      entity: 'sub_admin',
      entityId: uid,
    });
  }

  void notifyCustomerAndPush({
    userId: uid,
    title: 'تفعيل حساب المشرف الفرعي',
    body: `مرحباً ${payload.fullName.trim()}، تم إنشاء حساب المشرف الفرعي الخاص بك في لوحة تحكم طازج.`,
    type: 'system',
  }).catch(() => undefined);

  return { id: uid };
}

export async function updateSubAdmin(payload: UpdateSubAdminPayload): Promise<void> {
  const ref = doc(firestoreDb, 'users', payload.userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('حساب المشرف غير موجود');

  const current = snap.data() as FirestoreUserDoc;
  await updateDoc(ref, {
    fullName: payload.fullName.trim(),
    phone: normalizePhoneNumber(payload.phone),
    adminProfile: {
      id: current.adminProfile?.id ?? `ap-${payload.userId.slice(0, 8)}`,
      department: payload.department.trim(),
      permissionsNotes: payload.permissionsNotes?.trim() || null,
      createdByName: current.adminProfile?.createdByName ?? null,
    },
    updatedAt: new Date().toISOString(),
  });
}

export async function toggleSubAdminStatus(userId: string, isActive: boolean): Promise<void> {
  await updateDoc(doc(firestoreDb, 'users', userId), {
    isActive,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteSubAdmin(userId: string): Promise<void> {
  await updateDoc(doc(firestoreDb, 'users', userId), {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });
}

export async function resetSubAdminPassword(userId: string, newPassword: string): Promise<void> {
  void userId;
  void newPassword;
  throw new Error(
    'في خطة Firebase Spark المجانية بدون خادم، لا يمكن تغيير كلمة مرور مستخدم آخر عن بُعد؛ يمكن للمشرف إعادة تعيين كلمة مروره بنفسه أو حذف الحساب وإعادة إنشائه.',
  );
}
