'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { Distribution } from '@/entities';
import Button from '@/app/components/button';

export type DistributionSetsTableProps = {
    distributionSets: Distribution[];
    onDistributionSetNameClick: (distributionSet: Distribution) => void;
};

export default function DistributionSetsTable({ distributionSets, onDistributionSetNameClick }: DistributionSetsTableProps) {
    const columnHelper = createColumnHelper<Distribution>();

    const fullColumns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (cell) => (
                    <Button variant='text' onClick={() => onDistributionSetNameClick(cell.row.original)}>
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
    }, [columnHelper, onDistributionSetNameClick]);

    return (
        <>
            <Table columns={fullColumns} data={distributionSets} />
        </>
    );
}
