'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import styles from '@/app/x/deployment/components/target-table/styles.module.scss';
import IconButton from '@/app/components/icon-button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import { Metadata } from '@/entities';

export type TargetMetadataTableProps = {
  metadata?: Metadata[];
  onEditClick?: (metadata: Metadata) => void;
  onDeleteClick?: (metadata: Metadata) => void;
};

export default function TargetMetadataTable({ metadata = [], onEditClick, onDeleteClick }: TargetMetadataTableProps) {
  const columnHelper = createColumnHelper<{
    key: string;
    value: string;
  }>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('key', {
        header: 'Key',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('value', {
        header: 'Value',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            <IconButton height={'30px'} width={'30px'} onClick={() => onEditClick?.(info.row.original)}>
              <EditIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onDeleteClick?.(info.row.original)}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onDeleteClick, onEditClick]);

  return (
    <>
      <Table columns={columns} data={metadata} />
    </>
  );
}
