import { Tag } from '@/entities';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

import { ApiError } from '@/types/hawkbit-api/error';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type UseGetDistributionSetTagsByIdParams = {
  distributionSetId: number;
  queryOptions?: Omit<UseQueryOptions<Tag[], ApiError, Tag[]>, 'queryKey' | 'queryFn'>;
};

export const useGetDistributionSetTagsById = (params: UseGetDistributionSetTagsByIdParams) => {
  const { distributionSetId, queryOptions } = params ?? {};
  const queryKey = ['distribution-set-tags-by-id', distributionSetId];

  const { data, isLoading, error, refetch } = useQuery<Tag[], ApiError>({
    queryKey,
    queryFn: () => DistributionSetTagsService.getTagsByDistributionId(distributionSetId),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
