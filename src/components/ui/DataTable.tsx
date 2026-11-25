import { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumnDef,
} from '@tanstack/react-table/legacy';
import { ArrowUpDown } from 'lucide-react';
import { STRINGS } from '@/constants/strings';
import { useInfiniteSlice } from '@/hooks/useInfiniteSlice';
import { formatNumber } from '@/lib/format';
import { EmptyState, TableSkeleton } from './StateViews';

interface DataTableProps<TData extends object> {
  data: TData[];
  columns: LegacyColumnDef<TData, unknown>[];
  isLoading?: boolean;
  batchSize?: number;
  emptyTitle?: string;
}

export function DataTable<TData extends object>({
  data,
  columns,
  isLoading = false,
  batchSize = 15,
  emptyTitle = STRINGS.common.emptyTitle,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<Array<{ id: string; desc: boolean }>>([]);

  const table = useLegacyTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const sortedRows = table.getRowModel().rows;
  const {
    visibleItems: visibleRows,
    hasMore,
    loadMore,
    sentinelRef,
    totalCount,
  } = useInfiniteSlice({
    items: sortedRows,
    initialCount: batchSize,
    step: batchSize,
    resetKey: data.length,
  });

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-start border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-surface border-b border-outline-subtle">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className="py-md px-base font-label text-label-md text-on-surface-muted whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-xs hover:text-primary transition-colors duration-state-change"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-outline-subtle">
            {visibleRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-surface transition-colors duration-state-change"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-md px-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Sentinel / Status Footer */}
      <div
        ref={sentinelRef}
        className="flex items-center justify-between px-base py-sm border-t border-outline-subtle bg-surface"
      >
        <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
          {STRINGS.common.showingCount} {formatNumber(visibleRows.length)} {STRINGS.common.from}{' '}
          {formatNumber(totalCount)}
        </span>
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            className="px-md py-xs rounded-md bg-surface-card border border-outline-subtle text-primary font-label text-label-sm hover:bg-mint-surface transition-colors duration-state-change"
          >
            {STRINGS.common.loadMore}
          </button>
        ) : null}
      </div>
    </div>
  );
}
