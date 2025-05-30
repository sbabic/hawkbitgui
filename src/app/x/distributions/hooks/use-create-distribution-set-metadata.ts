import { Metadata } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useMutation } from '@tanstack/react-query';

export const useCreateDistributionSetMetadata = () => {
  const { mutateAsync: createDistributionSetMetadata, isPending } = useMutation({
    mutationFn: async (data: { distributionSetId: number; metadata: Metadata }) => {
      return DistributionSetsService.createMetadata(data.distributionSetId, data.metadata);
    },
  });

  return { createDistributionSetMetadata, isPending };
};
