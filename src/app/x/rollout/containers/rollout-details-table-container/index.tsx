'use client';

import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import RolloutDetailsTable from '../../components/rollout-details-table';

export default function RolloutDetailsTableContainer() {
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);

  if (!selectedRollout) {
    return null;
  }

  return <RolloutDetailsTable rolloutGroups={[]} />;
}
