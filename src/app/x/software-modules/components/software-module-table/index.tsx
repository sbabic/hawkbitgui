import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { SoftwareModule } from '@/entities/software-module';
import TrashIcon from '@/app/components/icons/trash-icon';
import TooltipIconButton from '@/app/components/tooltip-icon-button';
import EditIcon from '@/app/components/icons/edit-icon';
import ActionIconButtons from '@/app/components/action-icon-buttons';
import { Pagination } from '@/types/utils/pagination';

interface SoftwareModuleTableProps {
  modules: SoftwareModule[];
  isLoading?: boolean;
  pagination: Pagination;
  onRowClick?: (softwareModule: SoftwareModule) => void;
  onNameClick: (softwareModule: SoftwareModule) => void;
  onEditClick: (softwareModule: SoftwareModule) => void;
  onDeleteClick: (softwareModule: SoftwareModule) => void;
  onPageChange: (page: number) => void;
}

export default function SoftwareModuleTable({
  modules,
  isLoading = false,
  pagination,
  onRowClick,
  onNameClick,
  onEditClick,
  onDeleteClick,
  onPageChange,
}: SoftwareModuleTableProps) {
  const columnHelper = createColumnHelper<SoftwareModule>();

  const fullColumns = useMemo(
    () => [
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
    ],
    [columnHelper, onNameClick, onEditClick, onDeleteClick]
  );

  return (
    <Table
      columns={fullColumns}
      data={modules}
      pagination={pagination}
      isLoading={isLoading}
      draggable={true}
      selectable={true}
      onRowClick={(_, data) => onRowClick?.(data)}
      onPageChange={onPageChange}
    />
  );
}
