import { useMemo, useState } from 'react';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import {
  useCustomerOrders,
  useCustomers,
  useUpdateCustomerStatus,
} from '@/features/customers/hooks/useCustomers';
import { formatCurrency, formatNumber, formatShortDate } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import type { User } from '@/types/domain';

const columnHelper = legacyCreateColumnHelper<User>();

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

  const {
    data: customers = [],
    isLoading,
    isError,
    refetch,
  } = useCustomers({ status: statusFilter, search });

  const { data: customerOrders = [], isLoading: isOrdersLoading } = useCustomerOrders(
    selectedCustomer?.id ?? null,
  );
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateCustomerStatus();

  const handleToggleStatus = async (customer: User) => {
    const nextStatus = customer.status === 'active' ? 'suspended' : 'active';
    const updated = await updateStatus({ id: customer.id, status: nextStatus });
    setSelectedCustomer(updated);
    toast.success(STRINGS.customers.statusUpdatedToast);
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
        columnHelper.accessor('ordersCount', {
          header: STRINGS.customers.columns.ordersHistory,
          cell: (info) => {
            const customer = info.row.original;
            return (
              <span className="font-body text-body-sm text-on-surface tabular-nums">
                {formatNumber(info.getValue())} {STRINGS.customers.ordersCountSuffix}
                {customer.lastOrderCode
                  ? ` (${STRINGS.customers.lastOrderPrefix} ${customer.lastOrderCode})`
                  : ''}
              </span>
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
          cell: (info) => (
            <Button
              variant="outline"
              size="sm"
              className="text-primary"
              onClick={() => setSelectedCustomer(info.row.original)}
            >
              {STRINGS.customers.viewHistoryBtn}
            </Button>
          ),
        }),
      ] as LegacyColumnDef<User, unknown>[],
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
              </div>
              <Button
                variant={selectedCustomer.status === 'active' ? 'danger' : 'mint-outline'}
                size="sm"
                isLoading={isUpdating}
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
                      <span className="font-title text-title-sm text-on-surface tabular-nums">
                        {order.code}
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
