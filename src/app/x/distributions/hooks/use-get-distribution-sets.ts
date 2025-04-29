import { Distribution } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetsParams = {
    queryOptions?: Omit<UseQueryOptions<Distribution[], ApiError, Distribution[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSets = (params?: UseGetDistributionSetsParams) => {
    const { queryOptions } = params ?? {};
    const queryKey = ['distribution-sets'];

    const { data, isLoading, error, refetch } = useQuery<Distribution[], ApiError>({
        queryKey,
        queryFn: () => DistributionSetsService.fetchDistributionSets(),
        ...queryOptions,
    });

    return { data, isLoading, error, refetch };
};
