import { SoftwareModule } from '@/entities/software-module';
import { SoftwareModulesService } from '@/services/software-modules-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetSoftwareModulesParams = {
  queryParams?: { q?: string };
  queryOptions?: Omit<UseQueryOptions<SoftwareModule[], ApiError, SoftwareModule[]>, 'queryKey' | 'queryFn'>;
};

export const useGetSoftwareModules = (params?: UseGetSoftwareModulesParams) => {
  const { queryParams = {}, queryOptions } = params ?? {};
  const queryKey = ['software-modules', queryParams.q];

  const { data, isLoading, error, refetch } = useQuery<SoftwareModule[], ApiError>({
    queryKey,
    queryFn: () => SoftwareModulesService.fetchSoftwareModules({ queryParams }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
