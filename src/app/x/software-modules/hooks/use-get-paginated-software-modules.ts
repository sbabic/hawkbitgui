import { SoftwareModule } from '@/entities/software-module';
import { SoftwareModulesService } from '@/services/software-modules-service';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetPaginatedSoftwareModulesOutput = {
  softwareModules: SoftwareModule[];
  totalSoftwareModules: number;
};

type UseGetPaginatedSoftwareModulesParams = {
  queryParams?: { q?: string };
  queryOptions?: Omit<UseQueryOptions<UseGetPaginatedSoftwareModulesOutput, ApiError, UseGetPaginatedSoftwareModulesOutput>, 'queryKey' | 'queryFn'>;
};

export const useGetPaginatedSoftwareModules = (params?: UseGetPaginatedSoftwareModulesParams) => {
  const { queryParams = {}, queryOptions } = params ?? {};
  const page = useSoftwareModulesStore((state) => state.page);
  const size = useSoftwareModulesStore((state) => state.size);

  const queryKey = ['software-modules', queryParams.q, page, size];

  const { data, isLoading, error, refetch } = useQuery<UseGetPaginatedSoftwareModulesOutput, ApiError>({
    queryKey,
    queryFn: () => SoftwareModulesService.fetchSoftwareModules({ queryParams: { ...queryParams, offset: page * size, limit: size } }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
