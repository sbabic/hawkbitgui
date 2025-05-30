'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetDetails from '../../components/distribution-set-details';

export default function DistributionSetDetailsContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  if (!selectedDistribution) {
    return null;
  }

  return <DistributionSetDetails distributionSet={selectedDistribution} />;
}
