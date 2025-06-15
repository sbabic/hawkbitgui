import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import CreateRolloutForm from '../../components/create-rollout-form';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { CreateRolloutFormData } from '../../components/create-rollout-form/types';
import { useGetTargetFilters } from '@/app/x/target-filters/hooks/use-get-target-filters';
import { mapFormDataToCreateRolloutInput } from '../../utils/map-rollout-form-data-to-api-input';
import { useGetRollout } from '../../hooks/use-get-rollout';
import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import { useUpdateRollout } from '../../hooks/use-update-rollout';
import { mapRolloutToFormData } from '../../utils/map-rollout-to-form-data';

export interface EditRolloutFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EditRolloutFormContainer({ onSubmitSuccess, onCancel }: EditRolloutFormContainerProps) {
  const { refetch } = useGetRollouts({ queryOptions: { enabled: false } });
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);
  const { data: distributionSets } = useGetDistributionSets();
  const { data: targetFilters } = useGetTargetFilters();

  const { data: rollout } = useGetRollout({
    rolloutId: selectedRollout?.id ?? 0,
    queryOptions: { enabled: !!selectedRollout?.id },
  });
  const defaultValues = mapRolloutToFormData(rollout);

  const { updateRollout } = useUpdateRollout();

  const handleSubmit = async (data: CreateRolloutFormData) => {
    if (!selectedRollout) {
      return;
    }

    const input = mapFormDataToCreateRolloutInput(data);
    await updateRollout({ rolloutId: selectedRollout.id, name: input.name, description: input.description });
    onSubmitSuccess();
    refetch();
    setTimeout(() => {
      refetch();
    }, 5000);
  };

  return (
    <CreateRolloutForm
      type='edit'
      defaultValues={defaultValues}
      distributionSets={distributionSets ?? []}
      targetFilters={targetFilters ?? []}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
