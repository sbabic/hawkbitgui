'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { RolloutGroup } from '@/entities/rollout';
import { RolloutStatusCell } from '../rollouts-table/components/rollout-status-cell';
import { TotalTargetsPerStatusCell } from '../rollouts-table/components/total-targets-per-status-cell';
import dayjs from 'dayjs';

export type RolloutDetailsTableProps = {
  rolloutGroups: RolloutGroup[];
};

export default function RolloutDetailsTable({ rolloutGroups }: RolloutDetailsTableProps) {
  const columnHelper = createColumnHelper<RolloutGroup>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
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
      columnHelper.display({
        id: 'totalTargets',
        header: 'Targets',
        cell: (cell) => {
          const totalTargetsPerStatus = cell.row.original.totalTargetsPerStatus;
          if (!totalTargetsPerStatus) {
            return null;
          }
          const totalTargets = Object.values(totalTargetsPerStatus).reduce((acc, count) => acc + count, 0);
          return totalTargets;
        },
      }),
      columnHelper.accessor('errorThreshold', {
        header: 'Error threshold',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('triggerThreshold', {
        header: 'Trigger threshold',
        cell: (cell) => cell.getValue(),
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
  }, [columnHelper]);

  return <Table columns={columns} data={rolloutGroups} />;
}
