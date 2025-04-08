'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import TargetAssigned from '@/app/components/target-info-modal/components/target-assigned';
import { Distribution } from '@/entities';

export default function TargetAssignedContainer() {
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
        <TargetAssigned
            type={assignedDistribution?.typeName}
            version={assignedDistribution?.version}
            name={assignedDistribution?.name}
        />
    );
}
