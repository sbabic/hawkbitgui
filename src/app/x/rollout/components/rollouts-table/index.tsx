'use client';

import React, { useMemo } from 'react';
import { createColumnHelper, CellContext } from '@tanstack/react-table';
import styles from './styles.module.scss';
import Table from '@/app/components/table';
import IconButton from '@/app/components/icon-button';
import EditIcon from '@/app/components/icons/edit-icon';
import TrashIcon from '@/app/components/icons/trash-icon';
import PlayIcon from '@/app/components/icons/play-icon';
import CopyIcon from '@/app/components/icons/copy-icon';
import { Rollout } from '@/entities/rollout';
import ThumbsUpIcon from '@/app/components/icons/thumbs-up-icon';
import ForwardIcon from '@/app/components/icons/forward-icon';
import PauseIcon from '@/app/components/icons/pause-icon';
import { TargetStatus } from '@/entities';

export type RolloutsTableProps = {
    rollouts: Rollout[];
    onRolloutNameClick: (rollout: Rollout) => void;
    onPlayClick: (rollout: Rollout) => void;
    onPinClick: (rollout: Rollout) => void;
    onDetailsClick: (rollout: Rollout) => void;
    onEditClick: (rollout: Rollout) => void;
    onCopyClick: (rollout: Rollout) => void;
    onDeleteClick: (rollout: Rollout) => void;
};

export default function RolloutsTable({
    rollouts = [],
    onRolloutNameClick,
    onPlayClick,
    onPinClick,
    onDetailsClick,
    onEditClick,
    onCopyClick,
    onDeleteClick,
}: RolloutsTableProps) {
    const columnHelper = createColumnHelper<Rollout>();

    const columns = useMemo(() => {
        return [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => (
                    <button className={styles.linkButton} onClick={() => onRolloutNameClick(info.row.original)}>
                        {info.getValue()}
                    </button>
                ),
            }),
            columnHelper.accessor('distributionSet', {
                header: 'Distribution set',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (info: CellContext<Rollout, TargetStatus>) => {
                    const status = info.getValue();

                    const statusMapper: Record<TargetStatus, React.ReactElement | null> = {
                        IN_SYNC: <div className={styles.runningDot}></div>,
                        PENDING: <div className={styles.notStartedIcon}></div>,
                        ERROR: <div className={styles.errorDot}></div>,
                        REGISTERED: <div className={styles.registeredDot}></div>,
                        UNKNOWN: null,
                    };
                    const statusIcon = statusMapper[status] ?? null;

                    return <div className={styles.statusCell}>{statusIcon}</div>;
                },
            }),
            columnHelper.accessor('detailStatus', {
                header: 'Detail status',
                cell: (info) => {
                    const detailStatus = info.getValue();
                    if (detailStatus && detailStatus.includes('Error')) {
                        return (
                            <div className={styles.errorStatus}>
                                <div className={styles.errorDot}></div>
                                <span>{detailStatus}</span>
                            </div>
                        );
                    }
                    return null;
                },
            }),
            columnHelper.accessor('groupsCount', {
                header: 'Groups',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('targetsCount', {
                header: 'Targets',
                cell: (info) => info.getValue(),
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: (info) => (
                    <div className={styles.actionButtons}>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onPlayClick(info.row.original)}>
                            <PlayIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onPinClick(info.row.original)}>
                            <ThumbsUpIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onDetailsClick(info.row.original)}>
                            <PauseIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onDetailsClick(info.row.original)}>
                            <ForwardIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onEditClick(info.row.original)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onCopyClick(info.row.original)}>
                            <CopyIcon />
                        </IconButton>
                        <IconButton height={'24px'} width={'24px'} onClick={() => onDeleteClick(info.row.original)}>
                            <TrashIcon />
                        </IconButton>
                    </div>
                ),
            }),
        ];
    }, [columnHelper, onRolloutNameClick, onPlayClick, onPinClick, onDetailsClick, onEditClick, onCopyClick, onDeleteClick]);

    return (
        <>
            <Table columns={columns} data={rollouts} />
        </>
    );
}
