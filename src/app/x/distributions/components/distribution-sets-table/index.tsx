'use client';

import React, { useMemo, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Distribution } from '@/entities';
import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import SoftwareModuleSelectContainer from '@/app/x/software-modules/containers/software-module-select-container';

export type DistributionSetsTableProps = {
  distributionSets: Distribution[];
};

export default function DistributionSetsTable({ distributionSets }: DistributionSetsTableProps) {
  const columnHelper = createColumnHelper<Distribution>();

  const [isSelectModuleOpen, setIsSelectModuleOpen] = useState(false);
  const [selectedModuleId, setSelectedSoftwareModuleId] = useState<number>();

  const openSelectModuleForm = (distributionSetId: number) => {
    setSelectedSoftwareModuleId(distributionSetId);
    setIsSelectModuleOpen(true);
  };

  const closeSelectModuleForm = () => {
    setSelectedSoftwareModuleId(undefined);
    setIsSelectModuleOpen(false);
  };

  const fullColumns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => (
          <Button variant='text' onClick={() => openSelectModuleForm(cell.row.original.id)}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('version', {
        header: 'Version',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('locked', {
        header: 'Locked',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('requiredMigrationStep', {
        header: 'Required Migration Step',
        cell: (cell) => cell.getValue(),
      }),
    ];
  }, [columnHelper]);

  return (
    <>
      <Table columns={fullColumns} data={distributionSets} />
      <Modal isOpen={isSelectModuleOpen} onClose={closeSelectModuleForm}>
        <Modal.Header>Select modules</Modal.Header>
        <Modal.Content>
          <SoftwareModuleSelectContainer distributionSetId={selectedModuleId} />
        </Modal.Content>
      </Modal>
    </>
  );
}
