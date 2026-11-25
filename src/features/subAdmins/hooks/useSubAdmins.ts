import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSubAdmin,
  deleteSubAdmin,
  fetchSubAdmins,
  resetSubAdminPassword,
  toggleSubAdminStatus,
  updateSubAdmin,
} from '../api/subAdminsApi';

export const subAdminKeys = {
  all: ['sub-admins'] as const,
};

export function useSubAdmins(enabled = true) {
  return useQuery({
    queryKey: subAdminKeys.all,
    queryFn: fetchSubAdmins,
    enabled,
  });
}

export function useCreateSubAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSubAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: subAdminKeys.all }),
  });
}

export function useUpdateSubAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSubAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: subAdminKeys.all }),
  });
}

export function useToggleSubAdminStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toggleSubAdminStatus(userId, isActive),
    onSuccess: () => qc.invalidateQueries({ queryKey: subAdminKeys.all }),
  });
}

export function useDeleteSubAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSubAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: subAdminKeys.all }),
  });
}

export function useResetSubAdminPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, newPassword }: { userId: string; newPassword: string }) =>
      resetSubAdminPassword(userId, newPassword),
    onSuccess: () => qc.invalidateQueries({ queryKey: subAdminKeys.all }),
  });
}
