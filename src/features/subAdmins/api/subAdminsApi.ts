import { sanitizePublicEmail } from '@/lib/phoneAuth';
import { callFunction } from '@/services/firebase/app';
import type { User } from '@/types/domain';

interface RawStaffMember {
  id: string;
  firebaseUid: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  role: 'admin' | 'sub_admin' | 'customer';
  isActive: boolean;
  area: string;
  lastLoginAt: string | null;
  createdAt: string;
  adminProfile_on_user: {
    id: string;
    department: string;
    permissionsNotes: string | null;
    createdBy: { id: string; fullName: string } | null;
  } | null;
}

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
  const res = await callFunction<Record<string, never>, { items: RawStaffMember[] }>(
    'listSubAdmins',
    {},
  );
  return res.items.map((item) => ({
    id: item.id,
    firebaseUid: item.firebaseUid,
    name: item.fullName,
    phone: item.phone ?? 'غير مسجل',
    email: sanitizePublicEmail(item.email),
    role: item.role,
    status: item.isActive ? 'active' : 'suspended',
    isActive: item.isActive,
    area: item.area,
    ordersCount: 0,
    totalSpent: 0,
    createdAt: item.createdAt,
    adminProfile: item.adminProfile_on_user
      ? {
          id: item.adminProfile_on_user.id,
          department: item.adminProfile_on_user.department,
          permissionsNotes: item.adminProfile_on_user.permissionsNotes,
          createdByName: item.adminProfile_on_user.createdBy?.fullName ?? null,
        }
      : null,
  }));
}

export async function createSubAdmin(payload: CreateSubAdminPayload): Promise<{ id: string }> {
  return callFunction<CreateSubAdminPayload, { id: string }>('createSubAdmin', payload);
}

export async function updateSubAdmin(payload: UpdateSubAdminPayload): Promise<void> {
  await callFunction<UpdateSubAdminPayload, { updated: boolean }>('updateSubAdmin', payload);
}

export async function toggleSubAdminStatus(userId: string, isActive: boolean): Promise<void> {
  await callFunction<{ userId: string; isActive: boolean }, { isActive: boolean }>(
    'deactivateSubAdmin',
    { userId, isActive },
  );
}

export async function deleteSubAdmin(userId: string): Promise<void> {
  await callFunction<{ userId: string }, { deleted: boolean }>('deleteSubAdmin', { userId });
}

export async function resetSubAdminPassword(userId: string, newPassword: string): Promise<void> {
  await callFunction<{ userId: string; newPassword: string }, { passwordReset: boolean }>(
    'resetSubAdminPassword',
    { userId, newPassword },
  );
}
