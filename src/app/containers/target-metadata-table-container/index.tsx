'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Metadata } from '@/entities';
import React, { useEffect } from 'react';
import TargetMetadataTable from '@/app/components/target-metadata-table';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';
import { TargetsService } from '@/services/targets-service';

export default function TargetMetadataTableContainer() {
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
    const metadata = useTargetsMetadataTableStore((state) => state.metadata);

    const handleDeleteClick = async (metadata: Metadata) => {
        if (!selectedTarget) return;
        await TargetsService.deleteMetadata(selectedTarget.controllerId, metadata.key);
        await fetchMetadata(selectedTarget.controllerId);
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
        </>
    );
}
