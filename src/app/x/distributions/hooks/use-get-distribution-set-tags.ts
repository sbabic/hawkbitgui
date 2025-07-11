import { Tag } from '@/entities';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetTagsParams = {
  queryOptions?: Omit<UseQueryOptions<Tag[], ApiError, Tag[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSetTags = (params?: UseGetDistributionSetTagsParams) => {
  const { queryOptions } = params ?? {};
  const queryKey = ['distribution-set-tags'];

  const { data, isLoading, error, refetch } = useQuery<Tag[], ApiError>({
    queryKey,
    queryFn: () => DistributionSetTagsService.getTags(),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
