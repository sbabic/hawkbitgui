'use client';

import TargetDetails from '@/app/components/target-info-modal/components/target-details';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export default function TargetDetailsContainer() {
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const lastPollAt = selectedTarget?.pollStatus?.lastRequestAt ?? selectedTarget?.lastControllerRequestAt;

    return (
        <TargetDetails
            controllerId={selectedTarget?.controllerId}
            lastPoll={lastPollAt ? new Date(lastPollAt) : undefined}
            address={selectedTarget?.address}
            description={selectedTarget?.description}
            securityToken={selectedTarget?.securityToken}
            createdAt={selectedTarget?.createdAt ? new Date(selectedTarget.createdAt) : undefined}
            createdBy={selectedTarget?.createdBy}
            lastModifiedAt={selectedTarget?.lastModifiedAt ? new Date(selectedTarget.lastModifiedAt) : undefined}
            lastModifiedBy={selectedTarget?.lastModifiedBy}
        />
    );
}
