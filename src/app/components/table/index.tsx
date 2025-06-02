'use client';

import React from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import styles from './styles.module.scss';

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  variant?: 'default' | 'unstyled';
};

export default function Table<T>({ data, columns, variant = 'default' }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          {table.getRowModel().rows.map((row) => (
            <div className={styles.tr} key={row.id}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
