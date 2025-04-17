'use client';

import styles from './styles.module.scss';
import React from 'react';
import { TargetStatus } from '@/entities';

const statuses = Object.keys(TargetStatus) as TargetStatus[];

export interface ByStatusFilterProps {
    onStatusClick?: (statuses: TargetStatus[]) => void;
}

export default function ByStatusFilter({ onStatusClick }: ByStatusFilterProps) {
    const [selectedStatuses, setSelectedStatuses] = React.useState<TargetStatus[]>([]);
    const handleStatusClick = (status: TargetStatus) => {
        setSelectedStatuses((prev) => {
            const newStatuses = prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status];
            onStatusClick?.(newStatuses);
            console.log(newStatuses);
            return newStatuses;
        });
    };
    return (
        <div className={styles.container}>
            {statuses.map((status) => (
                <button
                    key={status}
                    className={`${styles.status} ${selectedStatuses.includes(status) ? styles.active : ''}`}
                    onClick={() => handleStatusClick(status)}
                >
                    <span className={`${styles.indicator} ${status.toLowerCase()}`} />
                    {status}
                </button>
            ))}
        </div>
    );
}
