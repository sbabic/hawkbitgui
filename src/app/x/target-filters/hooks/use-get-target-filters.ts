import { TargetFilter } from '@/entities/target-filter';
import { TargetFiltersService } from '@/services/target-filters-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetTargetFiltersParams = {
  queryOptions?: Omit<UseQueryOptions<TargetFilter[], ApiError, TargetFilter[]>, 'queryKey' | 'queryFn'>;
};

export const useGetTargetFilters = (params?: UseGetTargetFiltersParams) => {
  const { queryOptions } = params ?? {};
  const queryKey = ['target-filters'];

  const { data, isLoading, error, refetch } = useQuery<TargetFilter[], ApiError>({
    queryKey,
    queryFn: async () => {
      const { targetFilters } = await TargetFiltersService.fetchTargetFilters();
      return targetFilters;
    },
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
