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
import EditTargetFormContainer from '@/app/containers/edit-target-form-container';

export default function TargetTableContainer() {
    const filteredTargets = useTargetsTableStore((state) => state.filteredTargets);
    const isExpanded = useTargetsTableStore((state) => state.isExpanded);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const targetsTableStore = useTargetsTableStore();

    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
    const [isEditTargetModalOpen, setIsEditTargetModalOpen] = useState(false);

    const confirmDialog = useConfirmDialog<Target>();

    const handleDeleteClick = (target: Target) => {
        confirmDialog.open(target, async () => {
            await TargetsService.deleteTarget(target.controllerId);
            await fetchTargets();
            targetsTableStore.resetSelectedTarget();
        });
    };

    const handleEditClick = (target: Target) => {
        targetsTableStore.setSelectedTarget(target);
        setIsEditTargetModalOpen(true);
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
                onEditClick={handleEditClick}
            />
            <Modal isOpen={isTargetInfoModalOpen} onClose={() => setIsTargetInfoModalOpen(false)}>
                <TargetInfo />
            </Modal>
            <Modal isOpen={isEditTargetModalOpen} onClose={() => setIsEditTargetModalOpen(false)}>
                <EditTargetFormContainer onCancel={() => setIsEditTargetModalOpen(false)} onSubmitSuccess={() => setIsEditTargetModalOpen(false)} />
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
