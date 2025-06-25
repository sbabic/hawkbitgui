'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Distribution } from '@/entities';
import Button from '@/app/components/button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import TooltipIconButton from '@/app/components/tooltip-icon-button';
import ActionIconButtons from '@/app/components/action-icon-buttons';

export type DistributionSetsTableProps = {
  distributionSets: Distribution[];
  isLoading?: boolean;
  onNameClick: (distributionSet: Distribution) => void;
  onEditClick: (distributionSet: Distribution) => void;
  onDeleteClick: (distributionSet: Distribution) => void;
};

export default function DistributionSetsTable({ distributionSets, isLoading = false, onNameClick, onEditClick, onDeleteClick }: DistributionSetsTableProps) {
  const columnHelper = createColumnHelper<Distribution>();

  const fullColumns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => (
          <Button variant='text' onClick={() => onNameClick(cell.row.original)}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('version', {
        header: 'Version',
        cell: (cell) => cell.getValue(),
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

  return <Table columns={fullColumns} data={distributionSets} isLoading={isLoading} />;
}
