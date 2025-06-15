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
import { Rollout } from '@/entities/rollout';
import ThumbsUpIcon from '@/app/components/icons/thumbs-up-icon';
import ForwardIcon from '@/app/components/icons/forward-icon';
import PauseIcon from '@/app/components/icons/pause-icon';
import { TotalTargetsPerStatusCell } from './components/total-targets-per-status-cell';
import { RolloutStatusCell } from './components/rollout-status-cell';
import Button from '@/app/components/button';
import Tooltip from '@/app/components/tooltip';

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

export default function RolloutsTable({
  rollouts = [],
  onRolloutNameClick,
  onPlayClick,
  onPinClick,
  onDetailsClick,
  onEditClick,
  onCopyClick,
  onDeleteClick,
}: RolloutsTableProps) {
  const columnHelper = createColumnHelper<Rollout>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => (
          <Button variant='text' onClick={() => onRolloutNameClick(cell.row.original)}>
            {cell.getValue()}
          </Button>
        ),
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
        cell: (cell) => <TotalTargetsPerStatusCell totalTargetsPerStatus={cell.getValue()} />,
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
        size: 310,
        cell: (info) => (
          <div className={styles.actionButtons}>
            <Tooltip content='Run' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onPlayClick(info.row.original)}>
                <PlayIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Approve' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onPinClick(info.row.original)}>
                <ThumbsUpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Pause' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onDetailsClick(info.row.original)}>
                <PauseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Trigger next group' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onDetailsClick(info.row.original)}>
                <ForwardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Edit' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onEditClick(info.row.original)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Copy' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onCopyClick(info.row.original)}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content='Delete' place='bottom'>
              <IconButton height={'24px'} width={'24px'} className={styles.actionButton} onClick={() => onDeleteClick(info.row.original)}>
                <TrashIcon />
              </IconButton>
            </Tooltip>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onRolloutNameClick, onPlayClick, onPinClick, onDetailsClick, onEditClick, onCopyClick, onDeleteClick]);

  return <Table columns={columns} data={rollouts} />;
}
