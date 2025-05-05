'use client';

import DistributionDetails from '@/app/x/deployment/components/distribution-info/components/distribution-details';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export default function DistributionDetailsContainer() {
    const selectedDistribution = useDistributionsTableStore((state) => state.selectedDistribution);

    if (!selectedDistribution) return null;

    return (
        <DistributionDetails
            id={selectedDistribution.id}
            name={selectedDistribution.name}
            description={selectedDistribution.description}
            version={selectedDistribution.version}
            typeName={selectedDistribution.typeName}
            complete={selectedDistribution.complete}
            locked={selectedDistribution.locked}
            deleted={selectedDistribution.deleted}
            valid={selectedDistribution.valid}
            requiredMigrationStep={selectedDistribution.requiredMigrationStep}
            createdBy={selectedDistribution.createdBy}
            createdAt={selectedDistribution.createdAt}
            lastModifiedBy={selectedDistribution.lastModifiedBy}
            lastModifiedAt={selectedDistribution.lastModifiedAt}
        />
    );
}
