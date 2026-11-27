import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, ShieldCheck, Trash2, UserCog } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { EmptyState, ErrorState, TableSkeleton } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import {
  useCreateSubAdmin,
  useDeleteSubAdmin,
  useSubAdmins,
  useToggleSubAdminStatus,
  useUpdateSubAdmin,
} from '@/features/subAdmins/hooks/useSubAdmins';
import { isValidPhoneNumber } from '@/lib/phoneAuth';
import { useWebAuthStore } from '@/store/authStore';
import type { User } from '@/types/domain';

const createSchema = z.object({
  fullName: z.string().trim().min(2, STRINGS.common.requiredField),
  phone: z.string().trim().refine(isValidPhoneNumber, STRINGS.auth.phoneInvalid),
  email: z
    .string()
    .trim()
    .email(STRINGS.auth.emailInvalid)
    .optional()
    .or(z.literal('')),
  password: z.string().min(8, STRINGS.subAdmins.newPasswordLabel),
  department: z.string().trim().min(2, STRINGS.common.requiredField),
  permissionsNotes: z.string().trim().optional(),
});

const editSchema = z.object({
  fullName: z.string().trim().min(2, STRINGS.common.requiredField),
  phone: z.string().trim().refine(isValidPhoneNumber, STRINGS.auth.phoneInvalid),
  department: z.string().trim().min(2, STRINGS.common.requiredField),
  permissionsNotes: z.string().trim().optional(),
});

type CreateFormValues = z.infer<typeof createSchema>;
type EditFormValues = z.infer<typeof editSchema>;

export function SubAdminsPage() {
  const currentUser = useWebAuthStore((s) => s.user);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [deletingMember, setDeletingMember] = useState<User | null>(null);

  const { data: members = [], isLoading, isError, refetch } = useSubAdmins(
    currentUser?.role === 'admin',
  );
  const { mutateAsync: createMutate, isPending: isCreating } = useCreateSubAdmin();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useUpdateSubAdmin();
  const { mutate: toggleStatus } = useToggleSubAdminStatus();
  const { mutateAsync: removeSubAdmin, isPending: isDeletingMember } = useDeleteSubAdmin();

  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      department: 'إدارة العمليات والطلبات',
      permissionsNotes: '',
    },
  });

  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q),
    );
  }, [members, search]);

  const handleCreate = async (values: CreateFormValues) => {
    try {
      await createMutate({
        ...values,
        email: values.email?.trim() ? values.email.trim() : null,
      });
      toast.success(STRINGS.subAdmins.createdToast);
      createForm.reset();
      setCreateOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const openEdit = (member: User) => {
    setEditingMember(member);
    editForm.reset({
      fullName: member.name,
      phone: member.phone === 'غير مسجل' ? '' : member.phone,
      department: member.adminProfile?.department ?? 'إدارة العمليات',
      permissionsNotes: member.adminProfile?.permissionsNotes ?? '',
    });
  };

  const handleEdit = async (values: EditFormValues) => {
    if (!editingMember) return;
    try {
      await updateMutate({ userId: editingMember.id, ...values });
      toast.success(STRINGS.subAdmins.updatedToast);
      setEditingMember(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  return (
    <AdminLayout
      title={STRINGS.subAdmins.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.subAdmins.searchPlaceholder}
    >
      <div className="flex flex-col gap-base">
        <div className="flex flex-wrap items-center justify-between gap-md">
          <p className="font-body text-body-md text-on-surface-muted">
            {STRINGS.subAdmins.subtitle}
          </p>
          <Button variant="primary" size="md" onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4" />
            <span>{STRINGS.subAdmins.addButton}</span>
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          {isLoading ? (
            <div className="p-base">
              <TableSkeleton rows={5} />
            </div>
          ) : isError ? (
            <ErrorState onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-outline-subtle">
                    <th className="py-md px-base font-title text-title-sm text-on-surface-muted text-start">
                      {STRINGS.subAdmins.columns.name}
                    </th>
                    <th className="py-md px-base font-title text-title-sm text-on-surface-muted text-start">
                      {STRINGS.subAdmins.columns.role}
                    </th>
                    <th className="py-md px-base font-title text-title-sm text-on-surface-muted text-start">
                      {STRINGS.subAdmins.columns.department}
                    </th>
                    <th className="py-md px-base font-title text-title-sm text-on-surface-muted text-start">
                      {STRINGS.subAdmins.columns.status}
                    </th>
                    <th className="py-md px-base font-title text-title-sm text-on-surface-muted text-start">
                      {STRINGS.subAdmins.columns.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-subtle">
                  {filtered.map((member) => {
                    const isSelf = member.id === currentUser?.id;
                    const isPrimary = member.role === 'admin';
                    return (
                      <tr key={member.id} className="hover:bg-surface/60">
                        <td className="py-md px-base">
                          <div className="flex flex-col">
                            <span className="font-title text-title-sm text-on-surface">
                              {member.name}
                            </span>
                            <span className="font-body text-body-sm text-on-surface-subtle" dir="ltr">
                              {member.phone}
                            </span>
                          </div>
                        </td>
                        <td className="py-md px-base">
                          <Badge variant={isPrimary ? 'mint' : 'neutral'}>
                            {isPrimary
                              ? STRINGS.brand.adminRoleBadge
                              : STRINGS.brand.subAdminRoleBadge}
                          </Badge>
                        </td>
                        <td className="py-md px-base font-body text-body-md text-on-surface">
                          {member.adminProfile?.department ?? '—'}
                        </td>
                        <td className="py-md px-base">
                          <Badge variant={member.isActive ? 'mint' : 'error'}>
                            {member.isActive
                              ? STRINGS.customers.statusActive
                              : STRINGS.customers.statusSuspended}
                          </Badge>
                        </td>
                        <td className="py-md px-base">
                          <div className="flex items-center gap-xs flex-wrap">
                            <Button variant="outline" size="sm" onClick={() => openEdit(member)}>
                              <UserCog className="w-3.5 h-3.5" />
                              <span>{STRINGS.common.edit}</span>
                            </Button>
                            {!isSelf && !isPrimary ? (
                              <>
                                <Button
                                  variant="mint"
                                  size="sm"
                                  onClick={() => {
                                    toggleStatus({
                                      userId: member.id,
                                      isActive: !member.isActive,
                                    });
                                    toast.success(STRINGS.subAdmins.statusChangedToast);
                                  }}
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>
                                    {member.isActive
                                      ? STRINGS.subAdmins.deactivateBtn
                                      : STRINGS.subAdmins.activateBtn}
                                  </span>
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  aria-label={STRINGS.common.delete}
                                  onClick={() => setDeletingMember(member)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Create Sub-Admin Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={STRINGS.subAdmins.createModalTitle}
      >
        <form
          onSubmit={createForm.handleSubmit(handleCreate)}
          className="flex flex-col gap-md"
          noValidate
        >
          <Input
            label={STRINGS.subAdmins.fullNameLabel}
            error={createForm.formState.errors.fullName?.message}
            {...createForm.register('fullName')}
          />
          <Input
            label={STRINGS.subAdmins.phoneLabel}
            type="tel"
            dir="ltr"
            placeholder={STRINGS.auth.phonePlaceholder}
            error={createForm.formState.errors.phone?.message}
            {...createForm.register('phone')}
          />
          <Input
            label={STRINGS.subAdmins.emailLabel}
            type="email"
            placeholder={STRINGS.auth.emailPlaceholder}
            error={createForm.formState.errors.email?.message}
            {...createForm.register('email')}
          />
          <Input
            label={STRINGS.subAdmins.passwordLabel}
            type="password"
            error={createForm.formState.errors.password?.message}
            {...createForm.register('password')}
          />
          <Input
            label={STRINGS.subAdmins.departmentLabel}
            error={createForm.formState.errors.department?.message}
            {...createForm.register('department')}
          />
          <Input
            label={STRINGS.subAdmins.notesLabel}
            {...createForm.register('permissionsNotes')}
          />
          <div className="flex items-center gap-sm pt-sm">
            <Button type="submit" variant="primary" size="lg" isLoading={isCreating}>
              {STRINGS.common.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setCreateOpen(false)}
            >
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Sub-Admin Modal */}
      <Modal
        open={Boolean(editingMember)}
        onClose={() => setEditingMember(null)}
        title={STRINGS.subAdmins.editModalTitle}
      >
        <form
          onSubmit={editForm.handleSubmit(handleEdit)}
          className="flex flex-col gap-md"
          noValidate
        >
          <Input
            label={STRINGS.subAdmins.fullNameLabel}
            error={editForm.formState.errors.fullName?.message}
            {...editForm.register('fullName')}
          />
          <Input
            label={STRINGS.subAdmins.phoneLabel}
            error={editForm.formState.errors.phone?.message}
            {...editForm.register('phone')}
          />
          <Input
            label={STRINGS.subAdmins.departmentLabel}
            error={editForm.formState.errors.department?.message}
            {...editForm.register('department')}
          />
          <Input label={STRINGS.subAdmins.notesLabel} {...editForm.register('permissionsNotes')} />
          <div className="flex items-center gap-sm pt-sm">
            <Button type="submit" variant="primary" size="lg" isLoading={isUpdating}>
              {STRINGS.common.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setEditingMember(null)}
            >
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={deletingMember !== null}
        onClose={() => setDeletingMember(null)}
        isLoading={isDeletingMember}
        message={
          deletingMember
            ? `هل أنت متأكد من حذف حساب المشرف «${deletingMember.name}»؟ لا يمكن التراجع عن هذا الإجراء.`
            : STRINGS.common.confirmDeleteGeneric
        }
        onConfirm={async () => {
          if (!deletingMember) return;
          try {
            await removeSubAdmin(deletingMember.id);
            toast.success(STRINGS.subAdmins.deletedToast);
            setDeletingMember(null);
          } catch (err) {
            const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
            toast.error(msg || STRINGS.common.errorMessage);
          }
        }}
      />
    </AdminLayout>
  );
}
