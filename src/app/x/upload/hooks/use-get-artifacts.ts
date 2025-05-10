import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import { SoftwareModuleArtifactsService } from '@/services/software-module-artifacts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetArtifactsParams = {
  softwareModuleId: number;
  queryOptions?: Omit<UseQueryOptions<SoftwareModuleArtifact[], ApiError, SoftwareModuleArtifact[]>, 'queryKey' | 'queryFn'>;
};

export const useGetArtifacts = (params: UseGetArtifactsParams) => {
  const { softwareModuleId, queryOptions } = params;
  const queryKey = ['software-module-artifacts', softwareModuleId];

  const { data, isLoading, error, refetch } = useQuery<SoftwareModuleArtifact[], ApiError>({
    queryKey,
    queryFn: () => SoftwareModuleArtifactsService.getArtifacts({ softwareModuleId }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
