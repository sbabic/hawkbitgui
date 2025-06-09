import { RolloutType } from '@/entities/rollout';
import { TargetFiltersService } from '@/services/target-filters-service';
import { useMutation } from '@tanstack/react-query';

export const useSetAutoAssignmentDistribution = () => {
  const { mutateAsync: setAutoAssignmentDistribution, isPending } = useMutation({
    mutationFn: async (data: { targetFilterId: number; distributionSetId: number; actionType: RolloutType }) => {
      return TargetFiltersService.setAutoAssignDistributionSet(data.targetFilterId, {
        distributionSetId: data.distributionSetId,
        actionType: data.actionType,
      });
    },
  });

  return { setAutoAssignmentDistribution, isPending };
};
