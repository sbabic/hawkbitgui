import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import CreateRolloutForm from '../../components/create-rollout-form';
import { useCreateRollout } from '../../hooks/use-create-rollout';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { CreateRolloutFormData } from '../../components/create-rollout-form/types';
import { useGetTargetFilters } from '@/app/x/target-filters/hooks/use-get-target-filters';
import { mapFormDataToCreateRolloutInput } from '../../utils/map-rollout-form-data-to-api-input';

export interface RolloutFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function CreateRolloutFormContainer({ onSubmitSuccess, onCancel }: RolloutFormContainerProps) {
  const { refetch } = useGetRollouts({ queryOptions: { enabled: false } });
  const { data: distributionSets } = useGetDistributionSets();
  const { data: targetFilters } = useGetTargetFilters();

  const { createRollout } = useCreateRollout();

  const handleSubmit = async (data: CreateRolloutFormData) => {
    const input = mapFormDataToCreateRolloutInput(data);
    await createRollout(input);
    onSubmitSuccess();
    refetch();
  };

  return <CreateRolloutForm distributionSets={distributionSets ?? []} targetFilters={targetFilters ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
