import { DistributionSetType } from '@/entities/distribution-set-type';
import { DistributionSetTypesService } from '@/services/distribution-set-types-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetTypesParams = {
    queryOptions?: Omit<UseQueryOptions<DistributionSetType[], ApiError, DistributionSetType[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSetTypes = (params?: UseGetDistributionSetTypesParams) => {
    const { queryOptions } = params ?? {};
    const queryKey = ['distribution-set-types'];

    const { data, isLoading, error, refetch } = useQuery<DistributionSetType[], ApiError>({
        queryKey,
        queryFn: () => DistributionSetTypesService.fetchDistributionSetTypes(),
        ...queryOptions,
    });

    return { data, isLoading, error, refetch };
};
