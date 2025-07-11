import { useMutation } from '@tanstack/react-query';
import { DistributionSetTagFormData } from '../components/distribution-set-tag-form/types';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

export const useCreateDistributionSetTag = () => {
  const { mutateAsync: createDistributionSetTag, isPending } = useMutation({
    mutationFn: async (data: DistributionSetTagFormData) => {
      return DistributionSetTagsService.createTag(data);
    },
  });

  return { createDistributionSetTag, isPending };
};
