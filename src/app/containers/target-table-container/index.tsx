'use client';

import TargetTable from '@/app/components/target-table';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Target } from '@/entities';
import { useEffect } from 'react';

export interface TargetTableProps {
    onTargetNameClick?: (target: Target) => void;
    onDeleteClick?: (target: Target) => void;
    onEditClick?: (target: Target) => void;
}

export default function TargetTableContainer(props: TargetTableProps) {
    const targets = useTargetsTableStore((state) => state.targets);
    const isExpanded = useTargetsTableStore((state) => state.isExpanded);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

    useEffect(() => {
        fetchTargets();
    }, [fetchTargets]);
    return (
        <TargetTable
            targets={targets.map((target) => ({ ...target, status: 'Error' }))}
            expanded={isExpanded}
            onTargetNameClick={props.onTargetNameClick}
            onDeleteClick={props.onDeleteClick}
            onEditClick={props.onEditClick}
        />
    );
}
