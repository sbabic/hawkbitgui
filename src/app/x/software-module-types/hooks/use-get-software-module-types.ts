import { SoftwareModuleType } from '@/entities/software-module-type';
import { SoftwareModuleTypesService } from '@/services/software-module-types-service';

import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetSoftwareModuleTypesParams = {
  queryOptions?: Omit<UseQueryOptions<SoftwareModuleType[], ApiError, SoftwareModuleType[]>, 'queryKey' | 'queryFn'>;
};

export const useGetSoftwareModuleTypes = (params?: UseGetSoftwareModuleTypesParams) => {
  const { queryOptions } = params ?? {};
  const queryKey = ['software-module-types'];

  const { data, isLoading, error, refetch } = useQuery<SoftwareModuleType[], ApiError>({
    queryKey,
    queryFn: () => SoftwareModuleTypesService.fetchSoftwareModuleTypes(),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
