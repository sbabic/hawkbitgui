'use client';

import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import RolloutDetailsTable from '../../components/rollout-details-table';
import { useGetRolloutDeployGroups } from '../../hooks/use-get-rollout-deploy-groups';

export default function RolloutDetailsTableContainer() {
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);

  const setSelectedDeployGroup = useRolloutsPageStore((state) => state.setSelectedDeployGroup);

  const { data: rolloutDeployGroups } = useGetRolloutDeployGroups({
    rolloutId: selectedRollout?.id ?? 0,
    queryOptions: {
      enabled: !!selectedRollout,
    },
  });

  return <RolloutDetailsTable deployGroups={rolloutDeployGroups ?? []} onNameClick={setSelectedDeployGroup} />;
}
