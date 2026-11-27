import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import {
  useCustomerOrders,
  useCustomers,
  useDeleteCustomer,
  useUpdateCustomer,
  useUpdateCustomerStatus,
} from '@/features/customers/hooks/useCustomers';
import { formatCurrency, formatNumber, formatShortDate } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import { isValidPhoneNumber } from '@/lib/phoneAuth';
import type { User } from '@/types/domain';

const editCustomerSchema = z.object({
  fullName: z.string().trim().min(2, STRINGS.common.requiredField),
  phone: z.string().trim().refine(isValidPhoneNumber, STRINGS.auth.phoneInvalid),
  area: z.string().trim().min(2, STRINGS.common.requiredField),
});

type EditCustomerValues = z.infer<typeof editCustomerSchema>;

const columnHelper = legacyCreateColumnHelper<User>();

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<User | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<User | null>(null);

  const {
    data: customers = [],
    isLoading,
    isError,
    refetch,
  } = useCustomers({ status: statusFilter, search });

  const { data: customerOrders = [], isLoading: isOrdersLoading } = useCustomerOrders(
    selectedCustomer?.id ?? null,
  );
  const { mutateAsync: updateStatus, isPending: isUpdatingStatus } = useUpdateCustomerStatus();
  const { mutateAsync: updateCustomerMutate, isPending: isSavingEdit } = useUpdateCustomer();
  const { mutateAsync: deleteCustomerMutate, isPending: isDeleting } = useDeleteCustomer();

  const editForm = useForm<EditCustomerValues>({
    resolver: zodResolver(editCustomerSchema),
  });

  const handleToggleStatus = async (customer: User) => {
    const nextStatus = customer.status === 'active' ? 'suspended' : 'active';
    const updated = await updateStatus({ id: customer.id, status: nextStatus });
    setSelectedCustomer(updated);
    toast.success(STRINGS.customers.statusUpdatedToast);
  };

  const openEditModal = (customer: User) => {
    setEditingCustomer(customer);
    editForm.reset({
      fullName: customer.name,
      phone: customer.phone === 'غير مسجل' ? '' : customer.phone,
      area: customer.area,
    });
  };

  const handleSaveEdit = async (values: EditCustomerValues) => {
    if (!editingCustomer) return;
    try {
      await updateCustomerMutate({ id: editingCustomer.id, payload: values });
      toast.success(STRINGS.customers.updatedToast);
      setEditingCustomer(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCustomer) return;
    try {
      await deleteCustomerMutate(deletingCustomer.id);
      if (selectedCustomer?.id === deletingCustomer.id) {
        setSelectedCustomer(null);
      }
      toast.success(STRINGS.customers.deletedToast);
      setDeletingCustomer(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: STRINGS.customers.columns.customer,
          cell: (info) => {
            const customer = info.row.original;
            const suspended = customer.status === 'suspended';
            return (
              <div className="flex items-center gap-sm">
                {customer.avatarKey ? (
                  <img
                    src={getImageUrl(customer.avatarKey)}
                    alt={customer.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-title-sm shrink-0 ${
                      suspended
                        ? 'bg-surface-subtle text-on-surface-muted'
                        : 'bg-mint-surface text-primary-deep'
                    }`}
                  >
                    {customer.name.charAt(0)}
                  </div>
                )}
                <span className="font-title text-title-sm text-on-surface">{customer.name}</span>
              </div>
            );
          },
        }),
        columnHelper.accessor('phone', {
          header: STRINGS.customers.columns.phone,
          cell: (info) => (
            <span
              dir="ltr"
              className="inline-block font-body text-body-sm text-on-surface-muted tabular-nums"
            >
              {info.getValue()}
            </span>
          ),
        }),
        columnHelper.accessor('area', {
          header: STRINGS.customers.columns.area,
          cell: (info) => (
            <span className="font-body text-body-sm text-on-surface">{info.getValue()}</span>
          ),
        }),
        columnHelper.display({
          id: 'location',
          header: STRINGS.customers.columns.location,
          cell: (info) => {
            const { latitude, longitude } = info.row.original;
            if (latitude == null || longitude == null) {
              return (
                <span className="font-body text-body-sm text-on-surface-subtle">
                  {STRINGS.customers.noLocationLabel}
                </span>
              );
            }
            return (
              <a
                href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-xs font-label text-label-sm text-primary hover:underline"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{STRINGS.customers.openMapLabel}</span>
              </a>
            );
          },
        }),
        columnHelper.accessor('totalSpent', {
          header: STRINGS.customers.columns.totalSpent,
          cell: (info) => (
            <span className="font-headline text-title-sm text-primary tabular-nums">
              {formatCurrency(info.getValue())}
            </span>
          ),
        }),
        columnHelper.accessor('status', {
          header: STRINGS.customers.columns.status,
          cell: (info) => {
            const suspended = info.getValue() === 'suspended';
            return (
              <Badge variant={suspended ? 'error' : 'mint'}>
                {suspended
                  ? STRINGS.customers.statusSuspended
                  : STRINGS.customers.statusActive}
              </Badge>
            );
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: STRINGS.customers.columns.action,
          cell: (info) => {
            const customer = info.row.original;
            return (
              <div className="flex items-center gap-xs">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  {STRINGS.customers.viewHistoryBtn}
                </Button>
                <button
                  type="button"
                  aria-label={STRINGS.common.edit}
                  onClick={() => openEditModal(customer)}
                  className="w-8 h-8 rounded-md bg-surface border border-outline-subtle text-primary hover:bg-mint-surface flex items-center justify-center transition-colors duration-state-change"
                >
                  <Pencil className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={STRINGS.common.delete}
                  onClick={() => setDeletingCustomer(customer)}
                  className="w-8 h-8 rounded-md bg-surface border border-outline-subtle text-error hover:bg-error-container flex items-center justify-center transition-colors duration-state-change"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            );
          },
        }),
      ] as LegacyColumnDef<User, unknown>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <AdminLayout
      title={STRINGS.customers.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.customers.searchPlaceholder}
    >
      <Card padded={false} className="overflow-hidden">
        <div className="px-lg py-md border-b border-outline-subtle flex items-center justify-between gap-md flex-wrap">
          <h2 className="font-headline text-title-lg text-on-surface tabular-nums">
            {STRINGS.customers.registeredTitle} ({formatNumber(customers.length)})
          </h2>
          <div className="w-44">
            <Select
              aria-label={STRINGS.customers.columns.status}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')
              }
              options={[
                { value: 'all', label: STRINGS.customers.statusFilter.all },
                { value: 'active', label: STRINGS.customers.statusFilter.active },
                { value: 'suspended', label: STRINGS.customers.statusFilter.suspended },
              ]}
            />
          </div>
        </div>

        {isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <DataTable data={customers} columns={columns} isLoading={isLoading} />
        )}
      </Card>

      {/* Edit Customer Modal */}
      <Modal
        open={editingCustomer !== null}
        onClose={() => setEditingCustomer(null)}
        title={STRINGS.customers.editModalTitle}
        maxWidthClass="max-w-md"
      >
        <form
          onSubmit={editForm.handleSubmit(handleSaveEdit)}
          className="flex flex-col gap-md"
          noValidate
        >
          <Input
            label={STRINGS.customers.nameLabel}
            error={editForm.formState.errors.fullName?.message}
            {...editForm.register('fullName')}
          />
          <Input
            label={STRINGS.customers.phoneLabel}
            type="tel"
            dir="ltr"
            error={editForm.formState.errors.phone?.message}
            {...editForm.register('phone')}
          />
          <Input
            label={STRINGS.customers.areaLabel}
            error={editForm.formState.errors.area?.message}
            {...editForm.register('area')}
          />
          <div className="flex items-center gap-sm pt-sm">
            <Button type="submit" variant="primary" size="lg" isLoading={isSavingEdit} className="flex-1">
              {STRINGS.common.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setEditingCustomer(null)}
            >
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Customer Confirm Modal */}
      <ConfirmModal
        open={deletingCustomer !== null}
        onClose={() => setDeletingCustomer(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        message={
          deletingCustomer
            ? `هل أنت متأكد من حذف العميل «${deletingCustomer.name}»؟ ${STRINGS.customers.confirmDeleteMsg}`
            : STRINGS.common.confirmDeleteGeneric
        }
      />

      {/* Customer Orders History Modal */}
      <Modal
        open={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        title={
          selectedCustomer
            ? `${STRINGS.customers.historyModalTitle} — ${selectedCustomer.name}`
            : ''
        }
      >
        {selectedCustomer ? (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-md bg-surface border border-outline-subtle flex items-center justify-between gap-md flex-wrap">
              <div className="flex flex-col gap-xs">
                <span className="font-body text-body-sm text-on-surface-muted">
                  {selectedCustomer.area}
                </span>
                <span dir="ltr" className="font-body text-body-md text-on-surface tabular-nums">
                  {selectedCustomer.phone}
                </span>
                {selectedCustomer.latitude != null && selectedCustomer.longitude != null ? (
                  <a
                    href={`https://www.google.com/maps?q=${selectedCustomer.latitude},${selectedCustomer.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-xs font-label text-label-sm text-primary hover:underline"
                  >
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span dir="ltr" className="tabular-nums">
                      {selectedCustomer.latitude.toFixed(5)}, {selectedCustomer.longitude.toFixed(5)}
                    </span>
                  </a>
                ) : null}
              </div>
              <Button
                variant={selectedCustomer.status === 'active' ? 'danger' : 'mint-outline'}
                size="sm"
                isLoading={isUpdatingStatus}
                onClick={() => handleToggleStatus(selectedCustomer)}
              >
                {STRINGS.customers.toggleStatusBtn}
              </Button>
            </div>

            {isOrdersLoading ? (
              <p className="font-body text-body-md text-on-surface-subtle text-center py-lg">
                {STRINGS.common.loading}
              </p>
            ) : customerOrders.length === 0 ? (
              <EmptyState title={STRINGS.customers.noOrdersForCustomer} />
            ) : (
              <div className="divide-y divide-outline-subtle border border-outline-subtle rounded-md px-md">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="py-md flex items-center justify-between gap-md"
                  >
                    <div className="flex flex-col gap-xs">
                      <span dir="ltr" className="inline-block font-title text-title-sm text-on-surface tabular-nums">
                        {order.code || `#${order.id.slice(0, 8)}`}
                      </span>
                      <span className="font-body text-body-sm text-on-surface-subtle">
                        {formatShortDate(order.createdAt)} •{' '}
                        {STRINGS.orders.statusLabels[order.status]}
                      </span>
                    </div>
                    <span className="font-headline text-title-sm text-primary tabular-nums">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
