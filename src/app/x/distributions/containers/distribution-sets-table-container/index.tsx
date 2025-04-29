'use client';

import { useGetDistributionSets } from '../../hooks/use-get-distribution-sets';
import DistributionSetsTable from '../../components/distribution-sets-table';
import { Distribution } from '@/entities';

export default function DistributionSetsTableContainer() {
    const { data: distributionSets } = useGetDistributionSets();

    const handleDistributionSetNameClick = (distributionSet: Distribution) => {
        console.log('Distribution set name clicked:', distributionSet.name);
    };

    return <DistributionSetsTable distributionSets={distributionSets ?? []} onDistributionSetNameClick={handleDistributionSetNameClick} />;
}
