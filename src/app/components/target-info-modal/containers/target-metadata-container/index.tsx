'use client';

import TargetMetadata from '@/app/components/target-info-modal/components/target-metadata';
import { Modal } from '@/app/components/modal';
import CreateMetadataForm from '@/app/components/create-metadata-form';
import { useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';

export default function TargetMetadataContainer() {
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
    const [isCreateMetadataModalOpen, setIsCreateMetadataModalOpen] = useState<boolean>(false);

    const handleOnAddClick = () => {
        setIsCreateMetadataModalOpen(true);
    };

    const handleOnSubmit = async (data: { key: string; value: string }) => {
        if (!selectedTarget) return;
        await TargetsService.createMetadata(selectedTarget.controllerId, data);
        await fetchMetadata(selectedTarget.controllerId);
        setIsCreateMetadataModalOpen(false);
    };

    return (
        <>
            <TargetMetadata onAddClick={handleOnAddClick} />
            <Modal isOpen={isCreateMetadataModalOpen} onClose={() => setIsCreateMetadataModalOpen(false)}>
                <CreateMetadataForm onSubmit={handleOnSubmit} />
            </Modal>
        </>
    );
}
