import { TargetFilter } from '@/entities/target-filter';
import { TargetFiltersService } from '@/services/target-filters-service';
import { useTargetFiltersTableStore } from '@/stores/target-filters-table-store';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetPaginatedTargetFiltersOutput = {
  targetFilters: TargetFilter[];
  totalTargetFilters: number;
};

type UseGetPaginatedTargetFiltersParams = {
  queryOptions?: Omit<UseQueryOptions<UseGetPaginatedTargetFiltersOutput, ApiError, UseGetPaginatedTargetFiltersOutput>, 'queryKey' | 'queryFn'>;
};

export const useGetPaginatedTargetFilters = (params?: UseGetPaginatedTargetFiltersParams) => {
  const { queryOptions } = params ?? {};

  const page = useTargetFiltersTableStore((state) => state.page);
  const size = useTargetFiltersTableStore((state) => state.size);
  const searchQuery = useTargetFiltersTableStore((state) => state.searchQuery);
  const escapedSearchQuery = searchQuery?.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
  const fiqlSearchQuery = escapedSearchQuery ? `name=="*${escapedSearchQuery}*"` : undefined;

  const queryKey = ['target-filters', page, size, fiqlSearchQuery];

  const { data, isLoading, error, refetch } = useQuery<UseGetPaginatedTargetFiltersOutput, ApiError>({
    queryKey,
    queryFn: () =>
      TargetFiltersService.fetchTargetFilters({
        queryParams: {
          q: fiqlSearchQuery,
          offset: page * size,
          limit: size,
        },
      }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
