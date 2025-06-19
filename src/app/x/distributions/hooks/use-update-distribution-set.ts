import { DistributionSetsService } from '@/services/distribution-sets-service';
import { CreateDistributionSetInput } from '@/services/distribution-sets-services.types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDistributionSet = () => {
  const { mutateAsync: updateDistributionSet, isPending } = useMutation({
    mutationFn: async (data: Partial<CreateDistributionSetInput> & { distributionSetId: number }) => {
      return DistributionSetsService.updateDistributionSet(data.distributionSetId, data);
    },
  });

  return { updateDistributionSet, isPending };
};
