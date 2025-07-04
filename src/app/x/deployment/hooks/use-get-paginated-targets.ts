import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '@/types/hawkbit-api/error';
import { TargetsService } from '@/services/targets-service';
import { Target } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';

type UseGetPaginatedTargetsOutput = {
  targets: Target[];
  totalTargets: number;
};

interface TargetsQueryParams {
  q?: string;
}

type UseGetPaginatedTargetsParams = {
  queryParams?: TargetsQueryParams;
  queryOptions?: Omit<UseQueryOptions<UseGetPaginatedTargetsOutput, ApiError, UseGetPaginatedTargetsOutput>, 'queryKey' | 'queryFn'>;
};

export const useGetPaginatedTargets = (params?: UseGetPaginatedTargetsParams) => {
  const { queryParams = {}, queryOptions } = params ?? {};

  const page = useTargetsTableStore((state) => state.page);
  const size = useTargetsTableStore((state) => state.size);

  const { data, isLoading, error, refetch } = useQuery<UseGetPaginatedTargetsOutput, ApiError>({
    queryKey: ['targets', queryParams.q, page, size],
    queryFn: () => TargetsService.fetchTargets({ queryParams: { query: queryParams.q, offset: page * size, limit: size }, filters: [] }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
