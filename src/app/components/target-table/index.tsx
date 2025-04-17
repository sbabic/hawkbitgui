'use client';

import React, { useMemo } from 'react';
import { createColumnHelper, CellContext } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import { Target } from '@/entities';
import IconButton from '@/app/components/icon-button';
import PinIcon from '@/app/components/icons/pin-icon';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import dayjs from 'dayjs';

export type TargetTableProps = {
    expanded?: boolean;
    onTargetNameClick?: (target: Target) => void;
    targets?: Target[];
    onEditClick?: (target: Target) => void;
    onDeleteClick?: (target: Target) => void;
    onPinClick?: (target: Target) => void;
};

export default function TargetTable({ expanded, onTargetNameClick, targets = [], onEditClick, onDeleteClick, onPinClick }: TargetTableProps) {
    const columnHelper = createColumnHelper<Target>();

    const statusAccessor = useMemo(() => {
        return {
            header: 'Status',
            cell: (info: CellContext<Target, string>) => {
                const status = info.getValue();

                return (
                    <div className={styles.statusCell}>
                        <div className={styles.status}>
                            <span className={`${styles.statusIndicator} ${status.toLowerCase()}`} />
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
                    <button className={styles.linkButton} onClick={() => onTargetNameClick?.(info.row.original)}>
                        {info.getValue()}
                    </button>
                ),
            }),
            columnHelper.accessor('updateStatus', statusAccessor),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (info) => (
                    <div className={styles.actionButtons}>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onPinClick?.(info.row.original)}>
                            <PinIcon />
                        </IconButton>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onEditClick?.(info.row.original)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onDeleteClick?.(info.row.original)}>
                            <TrashIcon />
                        </IconButton>
                    </div>
                ),
            }),
        ];
    }, [columnHelper, onDeleteClick, onEditClick, onPinClick, onTargetNameClick, statusAccessor]);

    const fullColumns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => (
                    <button className={styles.linkButton} onClick={() => onTargetNameClick?.(info.row.original)}>
                        {info.getValue()}
                    </button>
                ),
            }),
            columnHelper.accessor('controllerId', {
                header: 'Controller Id',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('createdAt', {
                header: 'Created Date',
                cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
            }),
            columnHelper.accessor('createdBy', {
                header: 'Created By',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('lastModifiedAt', {
                header: 'Modified Date',
                cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
            }),
            columnHelper.accessor('lastModifiedBy', {
                header: 'Modified By',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('updateStatus', statusAccessor),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (info) => (
                    <div className={styles.actionButtons}>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onPinClick?.(info.row.original)}>
                            <PinIcon />
                        </IconButton>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onEditClick?.(info.row.original)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton height={'30px'} width={'30px'} onClick={() => onDeleteClick?.(info.row.original)}>
                            <TrashIcon />
                        </IconButton>
                    </div>
                ),
            }),
        ];
    }, [columnHelper, onDeleteClick, onEditClick, onPinClick, onTargetNameClick, statusAccessor]);

    return (
        <>
            <Table columns={expanded ? fullColumns : shortColumns} data={targets} />
        </>
    );
}
