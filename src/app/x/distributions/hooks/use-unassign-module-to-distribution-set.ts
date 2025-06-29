import { DistributionSetsService } from '@/services/distribution-sets-service';
import { UnassignModulesToDistributionSetInput } from '@/services/distribution-sets-services.types';
import { useMutation } from '@tanstack/react-query';

export const useUnassignModuleToDistributionSet = () => {
  const { mutateAsync: unassignModuleToDistributionSet, isPending } = useMutation({
    mutationFn: async (data: UnassignModulesToDistributionSetInput) => {
      return DistributionSetsService.unassignModulesToDistributionSet(data);
    },
  });

  return { unassignModuleToDistributionSet, isPending };
};
