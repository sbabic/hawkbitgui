'use client';

import { useState } from 'react';
import DistributionsCard from '@/app/x/deployment/components/distributions-card';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export default function DistributionsCardContainer() {
    const distributionsTableStore = useDistributionsTableStore();
    const [isExpanded, setIsExpanded] = useState(false);

    const [isCreateTargetFormOpen, setIsCreateTargetFormOpen] = useState(false);
    const [isTargetFiltersModalOpen, setIsTargetFiltersModalOpen] = useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
        distributionsTableStore.setIsExpanded(!isExpanded);
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
