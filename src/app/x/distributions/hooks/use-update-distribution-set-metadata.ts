import { Metadata } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDistributionSetMetadata = () => {
  const { mutateAsync: updateDistributionSetMetadata, isPending } = useMutation({
    mutationFn: async (data: { distributionSetId: number; metadata: Metadata }) => {
      return DistributionSetsService.updateMetadata(data.distributionSetId, data.metadata);
    },
  });

  return { updateDistributionSetMetadata, isPending };
};
