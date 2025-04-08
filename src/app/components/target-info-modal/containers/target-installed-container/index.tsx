'use client';

import TargetInstalled from '@/app/components/target-info-modal/components/target-installed';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import { Distribution } from '@/entities';

export default function TargetInstalledContainer() {
    const selectedTarget = useTargetsTableStore(
        (state) => state.selectedTarget
    );
    const [installedDistribution, setInstalledDistribution] = useState<
        Distribution | undefined
    >();

    useEffect(() => {
        if (!selectedTarget) return;

        const fetchInstalledDistribution = async () => {
            const installedDistribution =
                await TargetsService.getInstalledDistribution(
                    selectedTarget.controllerId
                );
            setInstalledDistribution(installedDistribution);
        };

        fetchInstalledDistribution().catch(console.error);
    }, [selectedTarget]);

    return (
        <TargetInstalled
            name={installedDistribution?.name}
            version={installedDistribution?.version}
            type={installedDistribution?.typeName}
        />
    );
}
