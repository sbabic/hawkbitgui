'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { DeployGroupTarget } from '@/entities/rollout';
import Table from '@/app/components/table';
import dayjs from 'dayjs';
import TargetStatusCell from '@/app/components/target-status-cell';

export type RolloutDeployGroupTargetsTableProps = {
  deployGroupTargets: DeployGroupTarget[];
  isLoading?: boolean;
};

export default function RolloutDeployGroupTargetsTable({ deployGroupTargets, isLoading = false }: RolloutDeployGroupTargetsTableProps) {
  const columnHelper = createColumnHelper<DeployGroupTarget>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('controllerId', {
        header: 'Controller ID',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('updateStatus', {
        header: 'Status',
        cell: (cell) => <TargetStatusCell status={cell.getValue()} />,
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created at',
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Last modified by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Last modified at',
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
    ];
  }, [columnHelper]);

  return <Table columns={columns} data={deployGroupTargets} isLoading={isLoading} />;
}
