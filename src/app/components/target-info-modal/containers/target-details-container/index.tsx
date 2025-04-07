'use client';

import TargetDetails from '@/app/components/target-info-modal/components/target-details';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export default function TargetDetailsContainer() {
    const selectedTarget = useTargetsTableStore(
        (state) => state.selectedTarget
    );
    return (
        <TargetDetails
            controllerId={selectedTarget?.controllerId}
            address={selectedTarget?.address}
            description={selectedTarget?.description}
            securityToken={selectedTarget?.securityToken}
        />
    );
}
