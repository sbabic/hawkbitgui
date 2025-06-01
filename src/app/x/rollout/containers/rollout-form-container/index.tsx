import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import CreateRolloutForm from '../../components/create-rollout-form';
import { useCreateRollout } from '../../hooks/use-create-rollout';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { CreateRolloutFormData } from '../../components/create-rollout-form/types';
import { CreateRolloutInput } from '@/services/rollouts-service.types';
import { RolloutTypes, StartType } from '@/entities/rollout';
import { useGetTargetFilters } from '@/app/x/target-filters/hooks/use-get-target-filters';

export interface RolloutFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

function getErrorConditionExpression(data: CreateRolloutFormData): string {
  if (!data.errorCondition) {
    return '';
  }

  if (data.isErrorCount && data.amountGroups) {
    const targetsCountInGroup = Math.floor(data.selectedTargetsCount / data.amountGroups); // take the minimum number of targets per group
    const countOfErrorsPerGroup = data.errorCondition.expression;
    const percentageOfErrorsPerGroup = Math.round((countOfErrorsPerGroup * 100) / targetsCountInGroup);
    return percentageOfErrorsPerGroup.toString();
  }

  return data.errorCondition.expression.toString();
}

function mapFormDataToCreateRolloutInput(data: CreateRolloutFormData): CreateRolloutInput {
  if (data.type !== RolloutTypes.TIME_FORCED && data.forcetime) {
    data.forcetime = undefined;
  }
  if (data.startType !== StartType.SCHEDULED && data.startAt) {
    data.startAt = undefined;
  }
  return {
    ...data,
    forcetime: data.forcetime ? data.forcetime.getTime() : undefined,
    startAt: data.startAt ? data.startAt.getTime() : undefined,
    successCondition: data.successCondition
      ? {
          ...data.successCondition,
          expression: data.successCondition.expression.toString(),
        }
      : undefined,
    errorCondition: data.errorCondition
      ? {
          ...data.errorCondition,
          expression: getErrorConditionExpression(data),
        }
      : undefined,
    groups: data.groups?.map((group) => ({
      ...group,
      successCondition: {
        ...group.successCondition,
        expression: group.successCondition.expression.toString(),
      },
      errorCondition: {
        ...group.errorCondition,
        expression: group.errorCondition.expression.toString(),
      },
    })),
  };
}

export default function RolloutFormContainer({ onSubmitSuccess, onCancel }: RolloutFormContainerProps) {
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
