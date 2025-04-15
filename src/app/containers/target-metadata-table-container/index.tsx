'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Metadata } from '@/entities';
import React, { useEffect, useState } from 'react';
import TargetMetadataTable from '@/app/components/target-metadata-table';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';
import { TargetsService } from '@/services/targets-service';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';

export default function TargetMetadataTableContainer() {
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
    const metadata = useTargetsMetadataTableStore((state) => state.metadata);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);
    const [metadataToDelete, setMetadataToDelete] = useState<Metadata | null>(null);

    const handleDeleteClick = (metadata: Metadata) => {
        setMetadataToDelete(metadata);
        setIsConfirmDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTarget || !metadataToDelete) return;
        await TargetsService.deleteMetadata(selectedTarget.controllerId, metadataToDelete.key);
        await fetchMetadata(selectedTarget.controllerId);
        setIsConfirmDeleteModalOpen(false);
        setMetadataToDelete(null);
    };

    const handleCloseModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setMetadataToDelete(null);
    };

    const handleEditClick = async (metadata: Metadata) => {
        console.log(metadata);
    };

    useEffect(() => {
        if (!selectedTarget) return;
        fetchMetadata(selectedTarget.controllerId).catch(console.error);
    }, [fetchMetadata, selectedTarget]);

    return (
        <>
            <TargetMetadataTable metadata={metadata} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
            <ConfirmDeleteModal
                message={`Are you sure you want to delete metadata "${metadataToDelete?.key}"?`}
                isOpen={isConfirmDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onClose={handleCloseModal}
            />
        </>
    );
}
