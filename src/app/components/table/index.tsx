'use client';

import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';
import DraggableDroppableRow from '@/app/components/draggable-droppable-row';

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  variant?: 'default' | 'unstyled';
  draggable?: boolean;
  selectable?: boolean;
  onRowClick?: (rowId: string, data: T, event: React.MouseEvent) => void;
  onRowSelect?: (rowId: string, data: T) => void;
};

export default function Table<T>({
  data,
  columns,
  isLoading = false,
  variant = 'default',
  draggable = false,
  selectable = false,
  onRowClick,
  onRowSelect,
}: TableProps<T>) {
  const uuid = useMemo(() => `table-${Math.random().toString(36).substr(2, 9)}`, []);
  const [selectedRows, setSelectedRows] = useState<Record<string, T>>({});
  const [columnSizing, setColumnSizing] = useState({});

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    state: { columnSizing },
    onColumnSizingChange: setColumnSizing,
  });

  const tableClassName = variant === 'unstyled' ? styles.unstyledTable : styles.defaultTable;

  const handleRowClick = (rowId: string, data: T, event: React.MouseEvent) => {
    let updated: Record<string, T>;

    setSelectedRows((prev) => {
      if (selectable && (event.ctrlKey || event.metaKey)) {
        if (prev[rowId] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [rowId]: _, ...rest } = prev;
          updated = rest;
        } else {
          updated = { ...prev, [rowId]: data };
        }
      } else {
        updated = { [rowId]: data };
      }
      return updated;
    });

    onRowClick?.(rowId, data, event);
    onRowSelect?.(rowId, data);
  };

  return (
    <div className={`${styles.tableContainer} ${tableClassName}`}>
      <div className={styles.table}>
        <div className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <div className={styles.tr} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <div
                  className={styles.th}
                  key={header.id}
                  style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    minWidth: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={styles.resizer}
                          style={{ cursor: 'col-resize' }}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.tbody}>
          {!isLoading ? (
            table.getRowModel().rows.map((row) => {
              const isSelected = !!selectedRows[row.id];
              return (
                <DraggableDroppableRow
                  className={styles.tr}
                  key={row.id}
                  id={`${uuid}-${row.id}`}
                  dragData={{ ...selectedRows, [row.id]: row.original }}
                  dropData={row.original}
                  draggable={draggable}
                  droppable={draggable}
                  isSelected={isSelected}
                  onClick={(event) => handleRowClick(row.id, row.original, event)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      className={styles.td}
                      key={cell.id}
                      style={{
                        flexGrow: 1,
                        flexBasis: 0,
                        minWidth: cell.column.getSize(),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </DraggableDroppableRow>
              );
            })
          ) : (
            <Skeleton width={'100%'} height={50} count={5} />
          )}
        </div>
      </div>
    </div>
  );
}
