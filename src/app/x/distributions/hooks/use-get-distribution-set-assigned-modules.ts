import { SoftwareModule } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetAssignedModulesParams = {
    queryOptions?: Omit<UseQueryOptions<SoftwareModule[], ApiError, SoftwareModule[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSetAssignedModules = (distributionSetId: number, params?: UseGetDistributionSetAssignedModulesParams) => {
    const { queryOptions } = params ?? {};
    const queryKey = ['distribution-set-assigned-software-modules', distributionSetId];

    const { data, isLoading, error, refetch } = useQuery<SoftwareModule[], ApiError>({
        queryKey,
        queryFn: () => DistributionSetsService.getAssignedSoftwareModules(distributionSetId),
        ...queryOptions,
    });

    return { data, isLoading, error, refetch };
};
