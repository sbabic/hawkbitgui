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

  return useQuery<Distribution[], ApiError>({
    queryKey,
    queryFn: async () => {
      const { distributionSets } = await DistributionSetsService.fetchDistributionSets();
      return distributionSets;
    },
    ...queryOptions,
  });
};
