'use client';

import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import styles from './styles.module.scss';
import DraggableDroppableRow from '@/app/components/draggable-droppable-row';

export type TableProps<T> = {
  data: T[];

  columns: ColumnDef<T, any>[];
  variant?: 'default' | 'unstyled';
  draggable?: boolean;
  selectable?: boolean;
};

export default function Table<T>({ data, columns, variant = 'default', draggable, selectable = false }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const uuid = useMemo(() => {
    // Generate a unique ID for the table instance
    return `table-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const [selectedRows, setSelectedRows] = useState<Record<string, T>>({});

  const tableClassName = variant === 'unstyled' ? styles.unstyledTable : styles.defaultTable;

  const handleRowClick = (rowId: string, data: T, event: React.MouseEvent) => {
    if (!selectable) return;
    if (event.ctrlKey || event.metaKey) {
      setSelectedRows((prev) => {
        if (prev[rowId] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [rowId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [rowId]: data };
      });
    }
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
                    width: header.getSize(),
                    minWidth: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.tbody}>
          {table.getRowModel().rows.map((row) => {
            const isSelected = !!selectedRows[row.id];
            return (
              <DraggableDroppableRow
                className={`${styles.tr} ${isSelected ? styles.selectedRow : ''}`}
                key={row.id}
                id={`${uuid}-${row.id}`}
                dragData={{ ...selectedRows, [row.id]: row.original }}
                dropData={row.original}
                draggable={draggable}
                droppable={draggable}
                onClick={(event) => handleRowClick(row.id, row.original, event)}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    className={styles.td}
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </DraggableDroppableRow>
            );
          })}
        </div>
      </div>
    </div>
  );
}
