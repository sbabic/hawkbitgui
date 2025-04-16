'use client';

import TargetTable from '@/app/components/target-table';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Target } from '@/entities';
import React, { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import TargetInfo from '@/app/components/target-info-modal';
import Modal from '@/app/components/modal';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';

export interface TargetTableProps {
    onEditClick?: (target: Target) => void;
}

export default function TargetTableContainer(props: TargetTableProps) {
    const filteredTargets = useTargetsTableStore((state) => state.filteredTargets);
    const isExpanded = useTargetsTableStore((state) => state.isExpanded);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const targetsTableStore = useTargetsTableStore();

    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
    const confirmDialog = useConfirmDialog<Target>();

    const handleDeleteClick = (target: Target) => {
        confirmDialog.open(target, async () => {
            await TargetsService.deleteTarget(target.controllerId);
            await fetchTargets();
            targetsTableStore.resetSelectedTarget();
        });
    };

    useEffect(() => {
        fetchTargets().catch(console.error);
    }, [fetchTargets]);

    return (
        <>
            <TargetTable
                targets={filteredTargets.map((target) => ({
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
            <Modal isOpen={isTargetInfoModalOpen} onClose={() => setIsTargetInfoModalOpen(false)}>
                <TargetInfo />
            </Modal>
            <ConfirmDeleteModal
                message={`Are you sure you want to delete target "${confirmDialog.data?.name}"?`}
                isOpen={confirmDialog.isOpen}
                onConfirm={confirmDialog.confirm}
                onClose={confirmDialog.close}
            />
        </>
    );
}
