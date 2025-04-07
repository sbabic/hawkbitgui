'use client';

import TargetTable from '@/app/components/target-table';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Target } from '@/entities';
import { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import { useTargetsCardStore } from '@/stores/targets-card-store';

export interface TargetTableProps {
    onEditClick?: (target: Target) => void;
}

export default function TargetTableContainer(props: TargetTableProps) {
    const targets = useTargetsTableStore((state) => state.targets);
    const isExpanded = useTargetsTableStore((state) => state.isExpanded);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const targetsCardStore = useTargetsCardStore();
    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
    const handleDeleteClick = async (target: Target) => {
        await TargetsService.deleteTarget(target.controllerId);
        await fetchTargets();
        targetsCardStore.resetSelectedTarget();
    };

    useEffect(() => {
        fetchTargets();
    }, [fetchTargets]);
    return (
        <TargetTable
            targets={targets.map((target) => ({ ...target, status: 'Error' }))}
            expanded={isExpanded}
            onTargetNameClick={(target) => {
                targetsCardStore.setSelectedTarget(target);
                setIsTargetInfoModalOpen(true);
            }}
            onDeleteClick={handleDeleteClick}
            onEditClick={props.onEditClick}
            isTargetInfoModalOpen={isTargetInfoModalOpen}
            onCloseTargetInfoModal={() => setIsTargetInfoModalOpen(false)}
        />
    );
}
