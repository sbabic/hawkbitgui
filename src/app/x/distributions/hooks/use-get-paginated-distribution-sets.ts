import { Distribution } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetPaginatedDistributionSetsOutput = {
  distributionSets: Distribution[];
  totalDistributionSets: number;
};

type UseGetPaginatedDistributionSetsParams = {
  queryOptions?: Omit<UseQueryOptions<UseGetPaginatedDistributionSetsOutput, ApiError, UseGetPaginatedDistributionSetsOutput>, 'queryKey' | 'queryFn'>;
};

export const useGetPaginatedDistributionSets = (params?: UseGetPaginatedDistributionSetsParams) => {
  const { queryOptions } = params ?? {};

  const page = useDistributionsSetsTableStore((state) => state.page);
  const size = useDistributionsSetsTableStore((state) => state.size);

  const queryKey = ['distribution-sets', page, size];

  return useQuery<UseGetPaginatedDistributionSetsOutput, ApiError>({
    queryKey,
    queryFn: () => DistributionSetsService.fetchDistributionSets({ filters: [] }, { offset: page * size, limit: size, sort: 'name:ASC' }),
    ...queryOptions,
  });
};
