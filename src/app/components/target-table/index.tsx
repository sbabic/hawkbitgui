'use client';

import React from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import { generateMockData, Target } from '@/entities';
import IconButton from '@/app/components/icon-button';
import PinIcon from '@/app/components/icons/pin-icon';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';

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
                <div className={styles.statusCell}>
                    <div className={styles.status}>
                        <span
                            className={`${styles.statusIndicator} ${statusClass}`}
                        />
                        {status}
                    </div>
                </div>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div className={styles.actionButtons}>
                <IconButton height={'30px'} width={'30px'}>
                    <PinIcon />
                </IconButton>
                <IconButton height={'30px'} width={'30px'}>
                    <EditIcon />
                </IconButton>
                <IconButton height={'30px'} width={'30px'}>
                    <TrashIcon />
                </IconButton>
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
