'use client';

import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import { useGetDeployGroupTargets } from '../../hooks/use-get-deploy-group-targets';
import RolloutDeployGroupTargetsTable from '../../components/rollout-deploy-group-targets-table';

export default function RolloutDeployGroupDetailsContainer() {
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);
  const selectedDeployGroup = useRolloutsPageStore((state) => state.selectedDeployGroup);

  const { data: deployGroupTargets, isLoading } = useGetDeployGroupTargets({
    rolloutId: selectedRollout?.id ?? 0,
    deployGroupId: selectedDeployGroup?.id ?? 0,
    queryOptions: {
      enabled: !!selectedDeployGroup || !!selectedRollout,
    },
  });

  return <RolloutDeployGroupTargetsTable deployGroupTargets={deployGroupTargets ?? []} isLoading={isLoading} />;
}
