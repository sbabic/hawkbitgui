import { DeployGroupTarget } from '@/entities/rollout';
import { RolloutsService } from '@/services/rollouts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDeployGroupTargetsParams = {
  rolloutId: number;
  deployGroupId: number;
  queryOptions?: Omit<UseQueryOptions<DeployGroupTarget[], ApiError, DeployGroupTarget[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDeployGroupTargets = (params: UseGetDeployGroupTargetsParams) => {
  const { rolloutId, deployGroupId, queryOptions } = params;
  const queryKey = ['deploy-group', deployGroupId, 'targets'];

  const { data, isLoading, error, refetch } = useQuery<DeployGroupTarget[], ApiError>({
    queryKey,
    queryFn: () => RolloutsService.fetchDeployGroupTargets({ rolloutId, deployGroupId }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
