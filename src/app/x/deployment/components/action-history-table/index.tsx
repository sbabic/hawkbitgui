'use client';

import React, { useMemo } from 'react';
import { createColumnHelper, CellContext } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import IconButton from '@/app/components/icon-button';
import dayjs from 'dayjs';
import { TargetAction } from '@/entities/target-action';
import XIcon from '@/app/components/icons/x-icon';
import RolloutIcon from '@/app/components/icons/rollout-icon';

export type ActionHistoryTableProps = {
  expanded?: boolean;
  onRowClick?: (targetAction: TargetAction) => void;
  targetActions?: TargetAction[];
  onForceQuitClick?: (targetAction: TargetAction) => void;
  onCancelClick?: (targetAction: TargetAction) => void;
  onForceClick?: (targetAction: TargetAction) => void;
};

export default function ActionHistoryTable({
  expanded,
  onRowClick,
  targetActions = [],
  onForceClick,
  onCancelClick,
  onForceQuitClick,
}: ActionHistoryTableProps) {
  const columnHelper = createColumnHelper<TargetAction>();

  const statusAccessor = useMemo(() => {
    return {
      header: 'Status',
      cell: (info: CellContext<TargetAction, string>) => {
        const status = info.getValue();

        return (
          <div className={styles.statusCell}>
            <div className={styles.status}>
              <span className={`${styles.statusIndicator} ${status.toLowerCase()}`} />
              {status}
            </div>
          </div>
        );
      },
    };
  }, []);

  const shortColumns = useMemo(() => {
    return [
      columnHelper.accessor('status', statusAccessor),
      columnHelper.accessor('id', {
        header: 'Action Id',
        cell: (info) => info.getValue(),
      }),
      // columnHelper.accessor('_links.distributionset.name', {
      //   header: 'Distribution Set',
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            <IconButton height={'30px'} width={'30px'} onClick={() => onForceClick?.(info.row.original)}>
              <RolloutIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onCancelClick?.(info.row.original)}>
              <XIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onForceQuitClick?.(info.row.original)}>
              <XIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onCancelClick, onForceClick, onForceQuitClick, statusAccessor]);

  const fullColumns = useMemo(() => {
    return [
      columnHelper.accessor('status', statusAccessor),
      columnHelper.accessor('id', {
        header: 'Action Id',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('_links.distributionset.name', {
        header: 'Distribution Set',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('detailStatus', statusAccessor),
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
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            <IconButton height={'30px'} width={'30px'} onClick={() => onForceClick?.(info.row.original)}>
              <RolloutIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onCancelClick?.(info.row.original)}>
              <XIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => onForceQuitClick?.(info.row.original)}>
              <XIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onCancelClick, onForceClick, onForceQuitClick, statusAccessor]);

  return (
    <>
      <Table
        columns={expanded ? fullColumns : shortColumns}
        data={targetActions}
        draggable={false}
        selectable={false}
        onRowClick={(_, data) => onRowClick?.(data)}
      />
    </>
  );
}
