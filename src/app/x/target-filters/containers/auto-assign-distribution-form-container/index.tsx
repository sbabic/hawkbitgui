import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import AutoAssignDistributionForm from '../../components/auto-assign-distribution-form';
import { AutoAssignDistributionFormData } from '../../components/auto-assign-distribution-form/types';
import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import { useSetAutoAssignmentDistribution } from '../../hooks/use-set-auto-assignment-distribution';
import { useDeleteAutoAssignmentDistribution } from '../../hooks/use-delete-auto-assignment-distribution';

interface AutoAssignDistributionFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function AutoAssignDistributionFormContainer({ onSubmitSuccess, onCancel }: AutoAssignDistributionFormContainerProps) {
  const autoAssign = useTargetFiltersPageStore((state) => state.autoAssign);
  const { data: distributionSets } = useGetDistributionSets();
  const { setAutoAssignmentDistribution } = useSetAutoAssignmentDistribution();
  const { deleteAutoAssignmentDistribution } = useDeleteAutoAssignmentDistribution();

  if (!autoAssign) {
    return null;
  }

  const { targetFilterId, distributionSetId, actionType } = autoAssign;

  const handleSubmit = async (data: AutoAssignDistributionFormData) => {
    const { targetFilterId, autoAssignDistributionSet, autoAssignActionType } = data;

    if (autoAssignDistributionSet && autoAssignActionType) {
      await setAutoAssignmentDistribution({
        targetFilterId,
        distributionSetId: autoAssignDistributionSet,
        actionType: autoAssignActionType,
      });
    } else {
      await deleteAutoAssignmentDistribution(targetFilterId);
    }
    onSubmitSuccess();
  };

  return (
    <AutoAssignDistributionForm
      defaultValues={{
        targetFilterId: targetFilterId,
        enableAutoAssign: !!distributionSetId && !!actionType,
        autoAssignDistributionSet: distributionSetId ?? undefined,
        autoAssignActionType: actionType ?? undefined,
      }}
      distributionSets={distributionSets ?? []}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
