import { Rollout } from '@/entities/rollout';
import { RolloutsQueryParams, RolloutsService, Representation } from '@/services/rollouts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const DEFAULT_QUERY_PARAMS: RolloutsQueryParams = { representation: Representation.FULL };

type UseGetRolloutsParams = {
  queryParams?: RolloutsQueryParams;
  queryOptions?: Omit<UseQueryOptions<Rollout[], ApiError, Rollout[]>, 'queryKey' | 'queryFn'>;
};

export const useGetRollouts = (params?: UseGetRolloutsParams) => {
  const { queryParams = DEFAULT_QUERY_PARAMS, queryOptions } = params ?? {};
  const queryKey = ['rollouts'];

  const { data, isLoading, error, refetch } = useQuery<Rollout[], ApiError>({
    queryKey,
    queryFn: () => RolloutsService.fetchRollouts({ queryParams }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
