import { Metadata } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetMetadataParams = {
  queryOptions?: Omit<UseQueryOptions<Metadata[], ApiError, Metadata[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSetMetadata = (distributionSetId: number, params?: UseGetDistributionSetMetadataParams) => {
  const { queryOptions } = params ?? {};
  const queryKey = ['distribution-set-metadata', distributionSetId];

  const { data, isLoading, error, refetch } = useQuery<Metadata[], ApiError>({
    queryKey,
    queryFn: () => DistributionSetsService.getMetadata(distributionSetId),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
