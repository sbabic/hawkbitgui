'use client';

import React, { useMemo } from 'react';
import { createColumnHelper, CellContext } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import { generateMockData, Target } from '@/entities';
import IconButton from '@/app/components/icon-button';
import PinIcon from '@/app/components/icons/pin-icon';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import dayjs from 'dayjs';

export type TargetWithStatus = Target & { status: string };

// Sample data array
const data: TargetWithStatus[] = generateMockData(20).map((target, index) => ({
    ...target,
    status: index % 4 === 0 ? 'Error' : 'Delivered',
}));

export type TargetTableProps = {
    expanded?: boolean;
    onTargetNameClick?: (target: Target) => void;
};

export default function TargetTable({
    expanded,
    onTargetNameClick,
}: TargetTableProps) {
    const columnHelper = createColumnHelper<TargetWithStatus>();

    const statusAccessor = useMemo(() => {
        return {
            header: 'Status',
            cell: (info: CellContext<TargetWithStatus, string>) => {
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
        };
    }, []);

    const shortColumns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => (
                    <button
                        className={styles.linkButton}
                        onClick={() => onTargetNameClick?.(info.row.original)}
                    >
                        {info.getValue()}
                    </button>
                ),
            }),
            columnHelper.accessor('status', statusAccessor),
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
    }, [columnHelper, onTargetNameClick, statusAccessor]);

    const fullColumns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => (
                    <button
                        className={styles.linkButton}
                        onClick={() => onTargetNameClick?.(info.row.original)}
                    >
                        {info.getValue()}
                    </button>
                ),
            }),
            columnHelper.accessor('controllerId', {
                header: 'Controller Id',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('createdDate', {
                header: 'Created Date',
                cell: (info) =>
                    dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
            }),
            columnHelper.accessor('createdBy', {
                header: 'Created By',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('modifiedDate', {
                header: 'Modified Date',
                cell: (info) =>
                    dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
            }),
            columnHelper.accessor('modifiedBy', {
                header: 'Modified By',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('status', statusAccessor),
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
    }, [columnHelper, onTargetNameClick, statusAccessor]);

    return (
        <Table columns={expanded ? fullColumns : shortColumns} data={data} />
    );
}
