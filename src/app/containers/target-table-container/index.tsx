'use client';

import TargetTable from '@/app/components/target-table';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Target } from '@/entities';
import React, { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import TargetInfo from '@/app/components/target-info-modal';
import Modal from '@/app/components/modal';

export interface TargetTableProps {
    onEditClick?: (target: Target) => void;
}

export default function TargetTableContainer(props: TargetTableProps) {
    const targets = useTargetsTableStore((state) => state.targets);
    const isExpanded = useTargetsTableStore((state) => state.isExpanded);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const targetsTableStore = useTargetsTableStore();

    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);

    const handleDeleteClick = async (target: Target) => {
        await TargetsService.deleteTarget(target.controllerId);
        await fetchTargets();
        targetsTableStore.resetSelectedTarget();
    };

    useEffect(() => {
        fetchTargets().catch(console.error);
    }, [fetchTargets]);

    return (
        <>
            <TargetTable
                targets={targets.map((target) => ({
                    ...target,
                    status: 'Error',
                }))}
                expanded={isExpanded}
                onTargetNameClick={(target) => {
                    targetsTableStore.setSelectedTarget(target);
                    setIsTargetInfoModalOpen(true);
                }}
                onDeleteClick={handleDeleteClick}
                onEditClick={props.onEditClick}
            />
            <Modal
                isOpen={isTargetInfoModalOpen}
                onClose={() => setIsTargetInfoModalOpen(false)}
            >
                <TargetInfo />
            </Modal>
        </>
    );
}
