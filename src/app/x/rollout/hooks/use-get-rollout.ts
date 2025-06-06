import { Rollout } from '@/entities/rollout';
import { RolloutsService } from '@/services/rollouts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetRolloutParams = {
  rolloutId: number;
  queryOptions?: Omit<UseQueryOptions<Rollout, ApiError, Rollout>, 'queryKey' | 'queryFn'>;
};

export const useGetRollout = (params: UseGetRolloutParams) => {
  const { rolloutId, queryOptions } = params;
  const queryKey = ['rollout', rolloutId];

  const { data, isLoading, error, refetch } = useQuery<Rollout, ApiError>({
    queryKey,
    queryFn: () => RolloutsService.fetchRollout({ rolloutId }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
