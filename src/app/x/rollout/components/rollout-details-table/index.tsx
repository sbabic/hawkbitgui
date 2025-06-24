'use client';

import React, { useCallback, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { RolloutDeployGroup, TotalTargetCountStatus } from '@/entities/rollout';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { DeployGroupStatusCell } from './components/deploy-group-status-cell';
import { TotalTargetsPerStatusCell } from '../rollouts-table/components/total-targets-per-status-cell';

export type RolloutDetailsTableProps = {
  deployGroups: RolloutDeployGroup[];
  onNameClick: (rolloutDeployGroup: RolloutDeployGroup) => void;
};

export default function RolloutDetailsTable({ deployGroups, onNameClick }: RolloutDetailsTableProps) {
  const columnHelper = createColumnHelper<RolloutDeployGroup>();

  const formatPercentage = (percentage: number) => {
    return `${Math.round(percentage)}%`;
  };

  const calculateFinishedPercentage = useCallback((totalTargetsPerStatus: Record<TotalTargetCountStatus, number> | undefined) => {
    if (!totalTargetsPerStatus) {
      return formatPercentage(0);
    }

    const totalTargets = Object.values(totalTargetsPerStatus).reduce((acc, curr) => acc + curr, 0);
    const finishedTargets = totalTargetsPerStatus.finished ?? 0;
    const finishedPercentage = Math.round((finishedTargets / totalTargets) * 100);
    return formatPercentage(finishedPercentage);
  }, []);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => (
          <Button variant='text' onClick={() => onNameClick(cell.row.original)}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (cell) => <DeployGroupStatusCell status={cell.getValue()} />,
      }),
      columnHelper.accessor('totalTargetsPerStatus', {
        header: 'Detail status',
        size: 180,
        cell: (cell) => <TotalTargetsPerStatusCell totalTargetsPerStatus={cell.getValue()} />,
      }),
      columnHelper.accessor('totalTargets', {
        header: 'Targets',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.display({
        id: 'finished',
        header: 'Finished',
        cell: (cell) => calculateFinishedPercentage(cell.row.original.totalTargetsPerStatus),
      }),
      columnHelper.accessor('errorCondition', {
        header: 'Error threshold',
        cell: (cell) => formatPercentage(Number(cell.row.original.errorCondition.expression)),
      }),
      columnHelper.accessor('successCondition', {
        header: 'Trigger threshold',
        cell: (cell) => formatPercentage(Number(cell.row.original.successCondition.expression)),
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created at',
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
    ];
  }, [columnHelper, onNameClick, calculateFinishedPercentage]);

  return <Table columns={columns} data={deployGroups} />;
}
