import { TargetFiltersService } from '@/services/target-filters-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAutoAssignmentDistribution = () => {
  const { mutateAsync: deleteAutoAssignmentDistribution, isPending } = useMutation({
    mutationFn: async (targetFilterId: number) => {
      return TargetFiltersService.deleteAutoAssignDistributionSet(targetFilterId);
    },
  });

  return { deleteAutoAssignmentDistribution, isPending };
};
