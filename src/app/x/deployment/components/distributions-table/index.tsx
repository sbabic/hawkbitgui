'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import { Distribution } from '@/entities';
import IconButton from '@/app/components/icon-button';
import TrashIcon from '@/app/components/icons/trash-icon';
import dayjs from 'dayjs';
import BlockIcon from '@/app/components/icons/block-icon';
import type { Pagination } from '@/types/utils/pagination';

export type DistributionsTableProps = {
  isLoading?: boolean;
  expanded?: boolean;
  onNameClick?: (distribution: Distribution) => void;
  distributions?: Distribution[];
  onInvalidateClick?: (distribution: Distribution) => void;
  onDeleteClick?: (distribution: Distribution) => void;
  onPinClick?: (distribution: Distribution) => void;
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
};

export default function DistributionsTable({
  expanded,
  onNameClick,
  distributions = [],
  onInvalidateClick,
  onDeleteClick,
  // onPinClick,
  isLoading,
  pagination,
  onPageChange,
}: DistributionsTableProps) {
  const columnHelper = createColumnHelper<Distribution>();

  const shortColumns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <button className={styles.linkButton} onClick={() => onNameClick?.(info.row.original)}>
            {info.getValue()}
          </button>
        ),
      }),
      columnHelper.accessor('version', {
        header: 'Version',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        size: 100,
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            {/*<IconButton height={'30px'} width={'30px'} onClick={() => onPinClick?.(info.row.original)}>*/}
            {/*  <PinIcon />*/}
            {/*</IconButton>*/}
            <IconButton height={'30px'} width={'30px'} onClick={() => onInvalidateClick?.(info.row.original)}>
              <BlockIcon width={20} height={20} />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onDeleteClick?.(info.row.original)}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onDeleteClick, onInvalidateClick, onNameClick]);

  const fullColumns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <button className={styles.linkButton} onClick={() => onNameClick?.(info.row.original)}>
            {info.getValue()}
          </button>
        ),
      }),
      columnHelper.accessor('version', {
        header: 'Version',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created Date',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created By',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Modified Date',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Modified By',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        size: 100,
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            {/*<IconButton height={'30px'} width={'30px'} onClick={() => onPinClick?.(info.row.original)}>*/}
            {/*  <PinIcon />*/}
            {/*</IconButton>*/}
            <IconButton height={'30px'} width={'30px'} onClick={() => onInvalidateClick?.(info.row.original)}>
              <BlockIcon width={20} height={20} />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onDeleteClick?.(info.row.original)}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onDeleteClick, onInvalidateClick, onNameClick]);

  return (
    <>
      <Table 
        columns={expanded ? fullColumns : shortColumns} 
        data={distributions} 
        draggable={true} 
        selectable={true} 
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </>
  );
}
