import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDistributionSet = () => {
  const { mutateAsync: deleteDistributionSet, isPending } = useMutation({
    mutationFn: async (distributionSetId: number) => {
      return DistributionSetsService.deleteDistributionSet(distributionSetId);
    },
  });

  return { deleteDistributionSet, isPending };
};
