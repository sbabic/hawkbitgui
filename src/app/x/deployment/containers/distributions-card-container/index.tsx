'use client';

import { useState } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import DistributionsCard from '@/app/x/deployment/components/distributions-card';

export default function DistributionsCardContainer() {
    const targetsTableStore = useTargetsTableStore();
    const [isExpanded, setIsExpanded] = useState(false);

    const [isCreateTargetFormOpen, setIsCreateTargetFormOpen] = useState(false);
    const [isTargetFiltersModalOpen, setIsTargetFiltersModalOpen] = useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
        targetsTableStore.setIsExpanded(!isExpanded);
    };

    return (
        <DistributionsCard
            isExpanded={isExpanded}
            onToggleExpand={handleExpand}
            isCreateTargetFormOpen={isCreateTargetFormOpen}
            onCloseCreateTargetForm={() => setIsCreateTargetFormOpen(false)}
            isTargetFiltersModalOpen={isTargetFiltersModalOpen}
            onOpenTargetFiltersModal={() => setIsTargetFiltersModalOpen(true)}
            onCloseTargetFiltersModal={() => setIsTargetFiltersModalOpen(false)}
        />
    );
}
