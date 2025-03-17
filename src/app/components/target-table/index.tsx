'use client';

import React from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import { generateMockData, Target } from '@/entities';

export type TargetWithStatus = Target & { status: string };

const columnHelper = createColumnHelper<TargetWithStatus>();

const columns: ColumnDef<TargetWithStatus, any>[] = [
    columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
            const status = info.getValue();
            let statusClass = '';

            // Map each status to a specific SCSS class
            switch (status) {
                case 'Delivered':
                    statusClass = styles.statusDelivered;
                    break;
                case 'Error':
                    statusClass = styles.statusError;
                    break;
                case 'Pending':
                    statusClass = styles.statusPending;
                    break;
                case 'Overdue':
                    statusClass = styles.statusOverdue;
                    break;
                default:
                    statusClass = styles.statusUnknown;
            }

            return (
                <div>
                    <span
                        className={`${styles.statusIndicator} ${statusClass}`}
                    />
                    {status}
                </div>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div>
                <button>View</button> <button>Edit</button>{' '}
                <button>Delete</button>
            </div>
        ),
    }),
];

// Sample data array
const data: TargetWithStatus[] = generateMockData(20).map((target, index) => ({
    ...target,
    status: index % 4 === 0 ? 'Error' : 'Delivered',
}));

export default function TargetTable() {
    return <Table columns={columns} data={data} />;
}
