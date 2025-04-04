'use client';

import { useState } from 'react';
import TargetsCard from '@/app/x/deployment/components/targets-card';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetsCardStore } from '@/stores/targets-card-store';
import { Target } from '@/entities';
import { TargetsService } from '@/services/targets-service';

export default function TargetsCardContainer() {
    const targetsCardStore = useTargetsCardStore();
    const targetsTableStore = useTargetsTableStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
    const [isCreateTargetFormOpen, setIsCreateTargetFormOpen] = useState(false);
    const [isTargetFiltersModalOpen, setIsTargetFiltersModalOpen] =
        useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
        targetsTableStore.setIsExpanded(!isExpanded);
    };

    const handleDeleteClick = async (target: Target) => {
        await TargetsService.deleteTarget(target.controllerId);
        await targetsTableStore.fetchTargets();
        targetsCardStore.resetSelectedTarget();
    };

    return (
        <TargetsCard
            isExpanded={isExpanded}
            onToggleExpand={handleExpand}
            isTargetInfoModalOpen={isTargetInfoModalOpen}
            onCloseTargetInfoModal={() => setIsTargetInfoModalOpen(false)}
            isCreateTargetFormOpen={isCreateTargetFormOpen}
            onOpenCreateTargetForm={() => setIsCreateTargetFormOpen(true)}
            onCloseCreateTargetForm={() => setIsCreateTargetFormOpen(false)}
            isTargetFiltersModalOpen={isTargetFiltersModalOpen}
            onOpenTargetFiltersModal={() => setIsTargetFiltersModalOpen(true)}
            onCloseTargetFiltersModal={() => setIsTargetFiltersModalOpen(false)}
            onTargetNameClick={(target) => {
                targetsCardStore.setSelectedTarget(target);
                setIsTargetInfoModalOpen(true);
            }}
            onDeleteClick={handleDeleteClick}
        />
    );
}
