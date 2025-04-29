'use client';

import DistributionSetTypesTable from '../../components/distribution-set-type-table';
import { useGetDistributionSetTypes } from '../../hooks/use-get-distribution-set-types';

export default function DistributionSetTypesTableContainer() {
    const { data: distributionSetTypes } = useGetDistributionSetTypes();

    return <DistributionSetTypesTable distributionSetTypes={distributionSetTypes ?? []} />;
}
