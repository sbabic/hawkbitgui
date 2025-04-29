'use client';

import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { DistributionSetType } from '@/entities/distribution-set-type';

export type DistributionSetTypesTableProps = {
    distributionSetTypes: DistributionSetType[];
};

export default function DistributionSetTypesTable({ distributionSetTypes }: DistributionSetTypesTableProps) {
    const columnHelper = createColumnHelper<DistributionSetType>();

    const fullColumns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (cell) => <Button variant='text'>{cell.getValue()}</Button>,
            }),
            columnHelper.accessor('key', {
                header: 'Key',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('deleted', {
                header: 'Deleted',
                cell: (cell) => cell.getValue(),
            }),
        ];
    }, [columnHelper]);

    return (
        <>
            <Table columns={fullColumns} data={distributionSetTypes} />
        </>
    );
}
