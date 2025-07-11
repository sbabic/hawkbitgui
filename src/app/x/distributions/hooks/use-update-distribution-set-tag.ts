import { useMutation } from '@tanstack/react-query';
import { DistributionSetTagFormData } from '../components/distribution-set-tag-form/types';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

export const useUpdateDistributionSetTag = () => {
  const { mutateAsync: updateDistributionSetTag, isPending } = useMutation({
    mutationFn: async (data: DistributionSetTagFormData & { distributionSetTagId: number }) => {
      return DistributionSetTagsService.updateTag({ ...data, id: data.distributionSetTagId });
    },
  });

  return { updateDistributionSetTag, isPending };
};
