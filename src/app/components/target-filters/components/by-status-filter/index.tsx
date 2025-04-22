'use client';

import styles from './styles.module.scss';
import React from 'react';
import { TargetStatus } from '@/entities';

const statuses = Object.keys(TargetStatus) as TargetStatus[];

export interface ByStatusFilterProps {
    onStatusClick?: (status: TargetStatus) => void;
    selectedStatuses?: TargetStatus[];
}

export default function ByStatusFilter({ onStatusClick, selectedStatuses }: ByStatusFilterProps) {
    return (
        <div className={styles.container}>
            {statuses.map((status) => (
                <button
                    key={status}
                    className={`${styles.status} ${selectedStatuses?.includes(status) ? styles.active : ''}`}
                    onClick={() => onStatusClick?.(status)}
                >
                    <span className={`${styles.indicator} ${status.toLowerCase()}`} />
                    {TargetStatus[status]}
                </button>
            ))}
        </div>
    );
}
