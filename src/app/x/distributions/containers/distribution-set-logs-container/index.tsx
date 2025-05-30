'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetLogs from '../../components/distribution-set-logs';

export default function DistributionSetLogsContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  if (!selectedDistribution) {
    return null;
  }

  return <DistributionSetLogs distributionSet={selectedDistribution} />;
}
