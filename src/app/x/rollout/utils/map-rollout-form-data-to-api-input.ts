import { CreateRolloutInput } from '@/services/rollouts-service.types';
import { CreateRolloutFormData } from '../components/create-rollout-form/types';
import { RolloutTypes, StartType } from '@/entities/rollout';
import dayjs from 'dayjs';

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

export function mapFormDataToCreateRolloutInput(data: CreateRolloutFormData): CreateRolloutInput {
  if (data.type !== RolloutTypes.TIME_FORCED && data.forcetime) {
    data.forcetime = undefined;
  }
  if (data.startType !== StartType.SCHEDULED && data.startAt) {
    data.startAt = undefined;
  }
  if (data.startType === StartType.AUTO) {
    data.startAt = dayjs().add(3, 'seconds').toDate();
  }
  if (data.groupsSettings === 'numberOfGroups') {
    data.groups = undefined;
  } else if (data.groupsSettings === 'advancedDefinition') {
    data.amountGroups = undefined;
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
