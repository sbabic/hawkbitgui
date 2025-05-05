'use client';

import { useState } from 'react';
import DistributionsCard from '@/app/x/deployment/components/distributions-card';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export default function DistributionsCardContainer() {
    const distributionsTableStore = useDistributionsTableStore();
    const [isExpanded, setIsExpanded] = useState(false);

    const [isCreateDistributionFormOpen, setIsCreateDistributionFormOpen] = useState(false);
    const [isDistributionsFiltersModalOpen, setIsDistributionsFiltersModalOpen] = useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
        distributionsTableStore.setIsExpanded(!isExpanded);
    };

    return (
        <DistributionsCard
            isExpanded={isExpanded}
            onToggleExpand={handleExpand}
            isCreateDistributionFormOpen={isCreateDistributionFormOpen}
            onCloseCreateDistributionForm={() => setIsCreateDistributionFormOpen(false)}
            isDistributionsFiltersModalOpen={isDistributionsFiltersModalOpen}
            onOpenDistributionsFiltersModal={() => setIsDistributionsFiltersModalOpen(true)}
            onCloseDistributionsFiltersModal={() => setIsDistributionsFiltersModalOpen(false)}
        />
    );
}
