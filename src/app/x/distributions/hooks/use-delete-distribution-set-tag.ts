import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDistributionSetTag = () => {
  const { mutateAsync: deleteDistributionSetTag, isPending } = useMutation({
    mutationFn: async (distributionSetTagId: number) => {
      return DistributionSetTagsService.deleteTag(distributionSetTagId);
    },
  });

  return { deleteDistributionSetTag, isPending };
};
