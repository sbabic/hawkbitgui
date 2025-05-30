import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDistributionSetMetadata = () => {
  const { mutateAsync: deleteDistributionSetMetadata, isPending } = useMutation({
    mutationFn: async (data: { distributionSetId: number; metadataKey: string }) => {
      return DistributionSetsService.deleteMetadata(data.distributionSetId, data.metadataKey);
    },
  });

  return { deleteDistributionSetMetadata, isPending };
};
