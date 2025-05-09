import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { TargetFilter } from '@/entities/target-filter';
import TrashIcon from '@/app/components/icons/trash-icon';
import IconButton from '@/app/components/icon-button';
import dayjs from 'dayjs';

interface TargetFiltersTableProps {
  modules: TargetFilter[];
  onDelete: (targetFilter: TargetFilter) => void;
}

export default function TargetFiltersTable({ modules, onDelete }: TargetFiltersTableProps) {
  const columnHelper = createColumnHelper<TargetFilter>();

  const fullColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => <Button variant='text'>{cell.getValue()}</Button>,
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created date',
        size: 230,
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Modified by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Modified date',
        size: 230,
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('autoAssignDistributionSet', {
        header: 'Auto assignment',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.display({
        header: 'Actions',
        cell: (cell) => (
          <IconButton onClick={() => onDelete(cell.row.original)}>
            <TrashIcon />
          </IconButton>
        ),
      }),
    ],
    [columnHelper, onDelete]
  );

  return <Table columns={fullColumns} data={modules} />;
}
