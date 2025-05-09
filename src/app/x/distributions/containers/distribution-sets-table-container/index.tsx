'use client';

import { useGetDistributionSets } from '../../hooks/use-get-distribution-sets';
import DistributionSetsTable from '../../components/distribution-sets-table';

export default function DistributionSetsTableContainer() {
  const { data: distributionSets } = useGetDistributionSets();

  return <DistributionSetsTable distributionSets={distributionSets ?? []} />;
}
