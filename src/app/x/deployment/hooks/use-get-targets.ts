import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '@/types/hawkbit-api/error';
import { TargetsService } from '@/services/targets-service';
import { Target } from '@/entities';

interface TargetsQueryParams {
  q?: string;
}

type UseGetTargetsParams = {
  queryParams?: TargetsQueryParams;
  queryOptions?: Omit<UseQueryOptions<Target[], ApiError, Target[]>, 'queryKey' | 'queryFn'>;
};

export const useGetTargets = (params?: UseGetTargetsParams) => {
  const { queryParams = {}, queryOptions } = params ?? {};
  const { data, isLoading, error, refetch } = useQuery<Target[], ApiError>({
    queryKey: ['targets', queryParams],
    queryFn: () => TargetsService.fetchTargets({ query: queryParams.q, filters: [] }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
