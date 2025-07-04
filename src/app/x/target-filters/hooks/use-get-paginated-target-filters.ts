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

  const queryKey = ['target-filters', page, size];

  const { data, isLoading, error, refetch } = useQuery<UseGetPaginatedTargetFiltersOutput, ApiError>({
    queryKey,
    queryFn: () => TargetFiltersService.fetchTargetFilters(),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
