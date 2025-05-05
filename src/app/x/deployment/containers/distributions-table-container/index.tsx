'use client';

import { Distribution } from '@/entities';
import React, { useEffect, useState } from 'react';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';
import DistributionsTable from '@/app/x/deployment/components/distributions-table';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { Modal } from '@/app/components/modal';
import DistributionInfo from '@/app/x/deployment/components/distribution-info';

export default function DistributionsTableContainer() {
    const filteredDistributions = useDistributionsTableStore((state) => state.filteredDistributions);
    const isExpanded = useDistributionsTableStore((state) => state.isExpanded);
    const fetchDistributions = useDistributionsTableStore((state) => state.fetchDistributions);
    const distributionsTableStore = useDistributionsTableStore();

    const [isDistributionInfoModalOpen, setIsDistributionInfoModalOpen] = useState(false);
    // const [isEditDistributionModalOpen, setIsEditDistributionModalOpen] = useState(false);

    const confirmDialog = useConfirmDialog<Distribution>();

    const handleDeleteClick = (distribution: Distribution) => {
        confirmDialog.open(distribution, async () => {
            await DistributionSetsService.deleteDistributionSet(distribution.id);
            await fetchDistributions();
            distributionsTableStore.resetSelectedDistribution();
        });
    };

    // const handleEditClick = (distribution: Distribution) => {
    //     distributionsTableStore.setSelectedDistribution(distribution);
    //     setIsEditDistributionModalOpen(true);
    // };

    useEffect(() => {
        fetchDistributions().catch(console.error);
    }, [fetchDistributions]);

    return (
        <>
            <DistributionsTable
                distributions={filteredDistributions.map((distribution) => ({
                    ...distribution,
                    status: 'Error',
                }))}
                expanded={isExpanded}
                onNameClick={(distribution) => {
                    distributionsTableStore.setSelectedDistribution(distribution);
                    setIsDistributionInfoModalOpen(true);
                }}
                onDeleteClick={handleDeleteClick}
            />
            <Modal isOpen={isDistributionInfoModalOpen} variant='unstyled' onClose={() => setIsDistributionInfoModalOpen(false)} size='fitContent'>
                <DistributionInfo />
            </Modal>
            {/*<Modal isOpen={isEditDistributionModalOpen} onClose={() => setIsEditDistributionModalOpen(false)} size='fitContent'>*/}
            {/*    <EditDistributionFormContainer*/}
            {/*        onCancel={() => setIsEditDistributionModalOpen(false)}*/}
            {/*        onSubmitSuccess={() => setIsEditDistributionModalOpen(false)}*/}
            {/*    />*/}
            {/*</Modal>*/}
            <ConfirmDeleteModal
                message={`Are you sure you want to delete distribution "${confirmDialog.data?.name}"?`}
                isOpen={confirmDialog.isOpen}
                onConfirm={confirmDialog.confirm}
                onClose={confirmDialog.close}
            />
        </>
    );
}
