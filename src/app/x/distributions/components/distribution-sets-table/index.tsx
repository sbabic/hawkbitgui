'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Distribution, DistributionKey } from '@/entities';
import Button from '@/app/components/button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import TooltipIconButton from '@/app/components/tooltip-icon-button';
import ActionIconButtons from '@/app/components/action-icon-buttons';
import { Pagination } from '@/types/utils/pagination';
import dayjs from 'dayjs';
import { transformToColumnVisibility } from '@/utils/columns-visibility';
import { VisibleColumn } from '@/types/utils/visible-column';

export type DistributionSetsTableProps = {
  distributionSets: Distribution[];
  isLoading?: boolean;
  visibleColumns: Partial<Record<DistributionKey, VisibleColumn>>;
  pagination: Pagination;
  onNameClick: (distributionSet: Distribution) => void;
  onEditClick: (distributionSet: Distribution) => void;
  onDeleteClick: (distributionSet: Distribution) => void;
  onPageChange: (page: number) => void;
};

export default function DistributionSetsTable({
  distributionSets,
  isLoading = false,
  pagination,
  visibleColumns,
  onNameClick,
  onEditClick,
  onDeleteClick,
  onPageChange,
}: DistributionSetsTableProps) {
  const columnHelper = createColumnHelper<Distribution>();

  const columnVisibility = useMemo(() => {
    return transformToColumnVisibility(visibleColumns);
  }, [visibleColumns]);

  const fullColumns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        size: 200,
        cell: (cell) => (
          <Button variant='text' onClick={() => onNameClick(cell.row.original)}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('version', {
        header: 'Version',
        size: 200,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created By',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Last Modified By',
        size: 160,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Last Modified At',
        size: 160,
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (cell) => (
          <ActionIconButtons>
            <TooltipIconButton icon={<EditIcon />} tooltipContent='Edit' iconButtonProps={{ onClick: () => onEditClick(cell.row.original) }} />
            <TooltipIconButton icon={<TrashIcon />} tooltipContent='Delete' iconButtonProps={{ onClick: () => onDeleteClick(cell.row.original) }} />
          </ActionIconButtons>
        ),
      }),
    ];
  }, [columnHelper, onNameClick, onEditClick, onDeleteClick]);

  return (
    <Table
      columns={fullColumns}
      draggable={true}
      selectable={true}
      columnVisibility={columnVisibility}
      data={distributionSets}
      isLoading={isLoading}
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
}
