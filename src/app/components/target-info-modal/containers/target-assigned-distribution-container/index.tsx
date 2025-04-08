'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import { Distribution } from '@/entities';
import TargetAssignedDistribution from '@/app/components/target-info-modal/components/target-assigned-distribution';

export default function TargetAssignedDistributionContainer() {
    const selectedTarget = useTargetsTableStore(
        (state) => state.selectedTarget
    );
    const [assignedDistribution, setAssignedDistribution] = useState<
        Distribution | undefined
    >();

    useEffect(() => {
        if (!selectedTarget) return;

        const fetchAssignedDistribution = async () => {
            const attributes = await TargetsService.getAssignedDistribution(
                selectedTarget.controllerId
            );
            setAssignedDistribution(attributes);
        };

        fetchAssignedDistribution().catch(console.error);
    }, [selectedTarget]);

    return (
        <TargetAssignedDistribution
            type={assignedDistribution?.typeName}
            version={assignedDistribution?.version}
            name={assignedDistribution?.name}
        />
    );
}
