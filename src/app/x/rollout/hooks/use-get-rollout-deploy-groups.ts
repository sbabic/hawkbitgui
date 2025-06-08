import { RolloutDeployGroup } from '@/entities/rollout';
import { RolloutsService } from '@/services/rollouts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetRolloutDeployGroupsParams = {
  rolloutId: number;
  queryOptions?: Omit<UseQueryOptions<RolloutDeployGroup[], ApiError, RolloutDeployGroup[]>, 'queryKey' | 'queryFn'>;
};

export const useGetRolloutDeployGroups = (params: UseGetRolloutDeployGroupsParams) => {
  const { rolloutId, queryOptions } = params;
  const queryKey = ['rollout', rolloutId, 'deploygroups'];

  const { data, isLoading, error, refetch } = useQuery<RolloutDeployGroup[], ApiError>({
    queryKey,
    queryFn: () => RolloutsService.fetchRolloutDeployGroups({ rolloutId }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
