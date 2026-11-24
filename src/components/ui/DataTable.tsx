import { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumnDef,
} from '@tanstack/react-table/legacy';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { STRINGS } from '@/constants/strings';
import { formatNumber } from '@/lib/format';
import { EmptyState, TableSkeleton } from './StateViews';

interface DataTableProps<TData extends object> {
  data: TData[];
  columns: LegacyColumnDef<TData, unknown>[];
  isLoading?: boolean;
  pageSize?: number;
  emptyTitle?: string;
}

export function DataTable<TData extends object>({
  data,
  columns,
  isLoading = false,
  pageSize = 8,
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

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
            {table.getRowModel().rows.map((row) => (
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

      {pageCount > 1 ? (
        <div className="flex items-center justify-between px-base py-md border-t border-outline-subtle bg-surface">
          <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
            {STRINGS.common.pageOf} {formatNumber(currentPage)} {STRINGS.common.from}{' '}
            {formatNumber(pageCount)}
          </span>
          <div className="flex items-center gap-xs">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="inline-flex items-center gap-xs px-md py-xs rounded-md bg-surface-card border border-outline-subtle text-on-surface font-label text-label-sm disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span>{STRINGS.common.previous}</span>
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="inline-flex items-center gap-xs px-md py-xs rounded-md bg-surface-card border border-outline-subtle text-on-surface font-label text-label-sm disabled:opacity-40"
            >
              <span>{STRINGS.common.next}</span>
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
