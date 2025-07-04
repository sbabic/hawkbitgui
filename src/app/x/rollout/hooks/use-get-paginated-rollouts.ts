import { Rollout } from '@/entities/rollout';
import { RolloutsQueryParams, RolloutsService } from '@/services/rollouts-service';
import { Representation } from '@/services/shared';
import { useRolloutsTableStore } from '@/stores/rollouts-table-store';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const DEFAULT_QUERY_PARAMS: RolloutsQueryParams = { representation: Representation.FULL };

export type UseGetPaginatedRolloutsOutput = {
  rollouts: Rollout[];
  totalRollouts: number;
};

type UseGetPaginatedRolloutsParams = {
  queryParams?: RolloutsQueryParams; // query params are not going to retrigger a refetch because they are not part of the query key
  queryOptions?: Omit<UseQueryOptions<UseGetPaginatedRolloutsOutput, ApiError, UseGetPaginatedRolloutsOutput>, 'queryKey' | 'queryFn'>;
};

export const useGetPaginatedRollouts = (params?: UseGetPaginatedRolloutsParams) => {
  const { queryParams = DEFAULT_QUERY_PARAMS, queryOptions } = params ?? {};
  const page = useRolloutsTableStore((state) => state.page);
  const size = useRolloutsTableStore((state) => state.size);

  const queryKey = ['rollouts', page, size];

  const { data, isLoading, error, refetch } = useQuery<UseGetPaginatedRolloutsOutput, ApiError>({
    queryKey,
    queryFn: () =>
      RolloutsService.fetchRollouts({
        queryParams: { representation: Representation.FULL, offset: page * size, limit: size, sort: 'name:ASC', ...queryParams },
      }),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
