'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetModules from '../../components/distribution-set-modules';

export default function DistributionSetModulesContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  if (!selectedDistribution) {
    return null;
  }

  return <DistributionSetModules distributionSet={selectedDistribution} />;
}
