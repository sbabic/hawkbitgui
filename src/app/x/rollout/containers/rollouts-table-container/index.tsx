'use client';

import { Rollout } from '@/entities/rollout';
import RolloutsTable from '../../components/rollouts-table';
import { TargetStatus } from '@/entities';

export default function RolloutsTableContainer() {
    const handleRolloutNameClick = (rollout: Rollout) => {
        console.log('Rollout name clicked:', rollout.name);
    };

    const handlePlayClick = (rollout: Rollout) => {
        console.log('Play clicked for rollout:', rollout.name);
    };

    const handlePinClick = (rollout: Rollout) => {
        console.log('Pin clicked for rollout:', rollout.name);
    };

    const handleDetailsClick = (rollout: Rollout) => {
        console.log('Details clicked for rollout:', rollout.name);
    };

    const handleEditClick = (rollout: Rollout) => {
        console.log('Edit clicked for rollout:', rollout.name);
    };

    const handleCopyClick = (rollout: Rollout) => {
        console.log('Copy clicked for rollout:', rollout.name);
    };

    const handleDeleteClick = (rollout: Rollout) => {
        console.log('Delete clicked for rollout:', rollout.name);
    };

    const actions = {
        onRolloutNameClick: handleRolloutNameClick,
        onPlayClick: handlePlayClick,
        onPinClick: handlePinClick,
        onDetailsClick: handleDetailsClick,
        onEditClick: handleEditClick,
        onCopyClick: handleCopyClick,
        onDeleteClick: handleDeleteClick,
    };

    const rollouts: Rollout[] = [
        {
            name: 'Rollout 1',
            distributionSet: 'Distribution Set 1',
            status: 'IN_SYNC',
            detailStatus: 'Running',
            groupsCount: 10,
            targetsCount: 100,
        },
    ];

    return <RolloutsTable rollouts={rollouts} {...actions} />;
}
