import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { SoftwareModule } from '@/entities/software-module';
import IconButton from '@/app/components/icon-button';
import TrashIcon from '@/app/components/icons/trash-icon';

interface SoftwareModuleTableProps {
  modules: SoftwareModule[];
  onNameClick: (softwareModule: SoftwareModule) => void;
  onDeleteClick: (softwareModule: SoftwareModule) => void;
}

export default function SoftwareModuleTable({ modules, onNameClick, onDeleteClick }: SoftwareModuleTableProps) {
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
        size: 50,
        cell: (cell) => (
          <IconButton onClick={() => onDeleteClick(cell.row.original)}>
            <TrashIcon />
          </IconButton>
        ),
      }),
    ],
    [columnHelper, onNameClick, onDeleteClick]
  );

  return (
    <>
      <Table columns={fullColumns} data={modules} />
    </>
  );
}
