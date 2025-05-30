'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Distribution } from '@/entities';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';

export type DistributionSetsTableProps = {
  distributionSets: Distribution[];
  onNameClick: (distributionSet: Distribution) => void;
};

export default function DistributionSetsTable({ distributionSets, onNameClick }: DistributionSetsTableProps) {
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
        cell: () => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <IconButton height={'30px'} width={'30px'} onClick={() => {}}>
              <EditIcon />
            </IconButton>
            <IconButton height={'30px'} width={'30px'} onClick={() => {}}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, onNameClick]);

  return (
    <>
      <Table columns={fullColumns} data={distributionSets} />
    </>
  );
}
