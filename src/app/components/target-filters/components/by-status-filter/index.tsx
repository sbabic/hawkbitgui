'use client';

import styles from './styles.module.scss';
import React from 'react';

const statuses = ['Delivered', 'Error', 'Pending', 'Overdue', 'Unknown'] as const;
type Status = (typeof statuses)[number];

export interface ByStatusFilterProps {
    onStatusClick?: (statuses: Status[]) => void;
}

export default function ByStatusFilter({ onStatusClick }: ByStatusFilterProps) {
    const [selectedStatuses, setSelectedStatuses] = React.useState<Status[]>([]);
    const handleStatusClick = (status: Status) => {
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
