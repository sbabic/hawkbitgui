'use client';

import { useState } from 'react';
import TargetsCard from '@/app/x/deployment/components/targets-card';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export default function TargetsCardContainer() {
    const targetsTableStore = useTargetsTableStore();
    const [isExpanded, setIsExpanded] = useState(false);

    const [isCreateTargetFormOpen, setIsCreateTargetFormOpen] = useState(false);
    const [isTargetFiltersModalOpen, setIsTargetFiltersModalOpen] = useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
        targetsTableStore.setIsExpanded(!isExpanded);
    };

    return (
        <TargetsCard
            isExpanded={isExpanded}
            onToggleExpand={handleExpand}
            isCreateTargetFormOpen={isCreateTargetFormOpen}
            onOpenCreateTargetForm={() => setIsCreateTargetFormOpen(true)}
            onCloseCreateTargetForm={() => setIsCreateTargetFormOpen(false)}
            isTargetFiltersModalOpen={isTargetFiltersModalOpen}
            onOpenTargetFiltersModal={() => setIsTargetFiltersModalOpen(true)}
            onCloseTargetFiltersModal={() => setIsTargetFiltersModalOpen(false)}
        />
    );
}
