'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import IconButton from '@/app/components/icon-button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import PlayIcon from '@/app/components/icons/play-icon';
import CopyIcon from '@/app/components/icons/copy-icon';
import { Rollout, TotalTargetCountStatus } from '@/entities/rollout';
import ThumbsUpIcon from '@/app/components/icons/thumbs-up-icon';
import ForwardIcon from '@/app/components/icons/forward-icon';
import PauseIcon from '@/app/components/icons/pause-icon';
import { TotalTargetsPerStatusCell } from './components/total-targets-per-status-cell';
import { RolloutStatusCell } from './components/rollout-status-cell';

export type RolloutsTableProps = {
  rollouts: Rollout[];
  onRolloutNameClick: (rollout: Rollout) => void;
  onPlayClick: (rollout: Rollout) => void;
  onPinClick: (rollout: Rollout) => void;
  onDetailsClick: (rollout: Rollout) => void;
  onEditClick: (rollout: Rollout) => void;
  onCopyClick: (rollout: Rollout) => void;
  onDeleteClick: (rollout: Rollout) => void;
};

export default function RolloutsTable({ rollouts = [], onPlayClick, onPinClick, onDetailsClick, onEditClick, onCopyClick, onDeleteClick }: RolloutsTableProps) {
  const columnHelper = createColumnHelper<Rollout>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('distributionSetId', {
        header: 'Distribution set',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (cell) => <RolloutStatusCell status={cell.getValue()} />,
      }),
      columnHelper.accessor('totalTargetsPerStatus', {
        header: 'Detail status',
        size: 180,
        cell: (cell) => {
          const totalTargetsPerStatus = cell.getValue();
          if (!totalTargetsPerStatus) {
            return null;
          }

          for (const status in totalTargetsPerStatus) {
            const statusKey = status as TotalTargetCountStatus;
            if (totalTargetsPerStatus[statusKey] === 0) {
              delete totalTargetsPerStatus[statusKey];
            }
          }

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(totalTargetsPerStatus).map(([status, count]) => (
                <TotalTargetsPerStatusCell key={status} status={status as TotalTargetCountStatus} count={count} />
              ))}
            </div>
          );
        },
      }),
      columnHelper.accessor('totalGroups', {
        header: 'Groups',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('totalTargets', {
        header: 'Targets',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className={styles.actionButtons}>
            <IconButton height={'24px'} width={'24px'} onClick={() => onPlayClick(info.row.original)}>
              <PlayIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onPinClick(info.row.original)}>
              <ThumbsUpIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onDetailsClick(info.row.original)}>
              <PauseIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onDetailsClick(info.row.original)}>
              <ForwardIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onEditClick(info.row.original)}>
              <EditIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onCopyClick(info.row.original)}>
              <CopyIcon />
            </IconButton>
            <IconButton height={'24px'} width={'24px'} onClick={() => onDeleteClick(info.row.original)}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onPlayClick, onPinClick, onDetailsClick, onEditClick, onCopyClick, onDeleteClick]);

  return <Table columns={columns} data={rollouts} />;
}
