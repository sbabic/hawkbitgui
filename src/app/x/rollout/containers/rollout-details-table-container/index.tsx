'use client';

import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import RolloutDetailsTable from '../../components/rollout-details-table';
import { useGetRolloutDeployGroups } from '../../hooks/use-get-rollout-deploy-groups';
import { RolloutDeployGroup } from '@/entities/rollout';

export default function RolloutDetailsTableContainer() {
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);

  const setTableType = useRolloutsPageStore((state) => state.setTableType);

  const { data: rolloutDeployGroups } = useGetRolloutDeployGroups({
    rolloutId: selectedRollout?.id ?? 0,
    queryOptions: {
      enabled: !!selectedRollout,
    },
  });

  const handleNameClick = (rolloutDeployGroup: RolloutDeployGroup) => {
    setTableType({ tableType: 'deploy-group-targets', selectedDeployGroup: rolloutDeployGroup });
  };

  return <RolloutDetailsTable deployGroups={rolloutDeployGroups ?? []} onNameClick={handleNameClick} />;
}
