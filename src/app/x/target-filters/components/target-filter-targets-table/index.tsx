'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Target } from '@/entities';
import dayjs from 'dayjs';
import Button from '@/app/components/button';

export type TargetFilterTargetsTableProps = {
  targets: Target[];
  isLoading?: boolean;
  onControllerIdClick: (controllerId: string) => void;
};

export default function TargetFilterTargetsTable({ targets, isLoading = false, onControllerIdClick }: TargetFilterTargetsTableProps) {
  const columnHelper = createColumnHelper<Target>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('controllerId', {
        header: 'Controller Id',
        cell: (cell) => (
          <Button variant='text' onClick={() => onControllerIdClick(cell.getValue())}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('updateStatus', {
        header: 'Status',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created by',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created Date',
        cell: (info) => dayjs(info.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Modified by',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Modified Date',
        cell: (info) => dayjs(info.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
    ];
  }, [columnHelper, onControllerIdClick]);

  return <Table columns={columns} data={targets} isLoading={isLoading} />;
}
