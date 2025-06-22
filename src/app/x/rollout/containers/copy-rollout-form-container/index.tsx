import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import CreateRolloutForm from '../../components/create-rollout-form';
import { useCreateRollout } from '../../hooks/use-create-rollout';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { CreateRolloutFormData } from '../../components/create-rollout-form/types';
import { useGetTargetFilters } from '@/app/x/target-filters/hooks/use-get-target-filters';
import { mapFormDataToCreateRolloutInput } from '../../utils/map-rollout-form-data-to-api-input';
import { Rollout } from '@/entities/rollout';
import { mapRolloutToFormData } from '../../utils/map-rollout-to-form-data';
import { useGetRolloutDeployGroups } from '../../hooks/use-get-rollout-deploy-groups';
import React, { useMemo } from 'react';
import { isEqual } from 'lodash-es';

export interface CopyRolloutFormContainerProps {
  rollout: Rollout;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

function CopyRolloutFormContainer({ rollout, onSubmitSuccess, onCancel }: CopyRolloutFormContainerProps) {
  const { refetch } = useGetRollouts({ queryOptions: { enabled: false } });
  const { data: distributionSets } = useGetDistributionSets();
  const { data: targetFilters } = useGetTargetFilters();

  const { data: rolloutDeployGroups } = useGetRolloutDeployGroups({ rolloutId: rollout.id });

  const defaultValues = useMemo(() => {
    return mapRolloutToFormData({ ...rollout, name: `Copy of ${rollout.name}` }, rolloutDeployGroups);
  }, [rollout, rolloutDeployGroups]);

  const { createRollout } = useCreateRollout();

  const handleSubmit = async (data: CreateRolloutFormData) => {
    const input = mapFormDataToCreateRolloutInput(data);
    await createRollout(input);
    onSubmitSuccess();
    refetch();
  };

  return (
    <CreateRolloutForm
      defaultValues={defaultValues}
      distributionSets={distributionSets ?? []}
      targetFilters={targetFilters ?? []}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}

export default React.memo(CopyRolloutFormContainer, (prev, next) => {
  return isEqual(prev.rollout, next.rollout);
});
