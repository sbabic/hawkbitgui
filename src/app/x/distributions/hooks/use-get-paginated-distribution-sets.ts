import { Distribution, FilterFiql } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useDistributionSetFiltersStore } from '@/stores/distribution-set-filters-store';
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

  const filters = useDistributionSetFiltersStore((state) => state.filters);
  const fiqlQueryParam = FilterFiql.parseFiltersToFeedItemQueryLanguage(Object.values(filters) ?? []);
  const query = fiqlQueryParam !== '' ? fiqlQueryParam : undefined;

  const page = useDistributionsSetsTableStore((state) => state.page);
  const size = useDistributionsSetsTableStore((state) => state.size);

  const queryKey = ['distribution-sets', page, size, query];

  return useQuery<UseGetPaginatedDistributionSetsOutput, ApiError>({
    queryKey,
    queryFn: () => DistributionSetsService.fetchDistributionSets({ filters: [] }, { query, offset: page * size, limit: size, sort: 'name:ASC' }),
    ...queryOptions,
  });
};
