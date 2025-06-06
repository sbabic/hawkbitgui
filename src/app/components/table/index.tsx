'use client';

import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import styles from './styles.module.scss';
import DraggableDroppableRow from '@/app/components/draggable-droppable-row';

export type TableProps<T> = {
  data: T[];

  columns: ColumnDef<T, any>[];
  variant?: 'default' | 'unstyled';
  draggable?: boolean;
};

export default function Table<T>({ data, columns, variant = 'default', draggable }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const uuid = useMemo(() => {
    // Generate a unique ID for the table instance
    return `table-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const tableClassName = variant === 'unstyled' ? styles.unstyledTable : styles.defaultTable;

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
                    flex: 1,
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
            return (
              <DraggableDroppableRow
                className={`${styles.tr}`}
                key={row.id}
                id={`${uuid}-${row.id}`}
                dragData={row.original}
                dropData={row.original}
                draggable={draggable}
                droppable={draggable}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    className={styles.td}
                    key={cell.id}
                    style={{
                      flex: 1,
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
