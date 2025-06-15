import { Rollout, RolloutDeployGroup, StartType } from '@/entities/rollout';
import { CreateRolloutFormData } from '../components/create-rollout-form/types';

export function mapRolloutToFormData(rollout?: Rollout, groups?: RolloutDeployGroup[]): CreateRolloutFormData | undefined {
  if (!rollout) {
    return undefined;
  }

  const formData: CreateRolloutFormData = {
    name: rollout.name,
    distributionSetId: rollout.distributionSetId,
    targetFilterQuery: rollout.targetFilterQuery,
    type: rollout.type,
    description: rollout.description,
    forcetime: rollout.forcetime ? new Date(rollout.forcetime) : undefined,
    startAt: rollout.startAt ? new Date(rollout.startAt) : undefined,
    isErrorCount: false,
    selectedTargetsCount: rollout.totalTargets,
    startType: StartType.MANUAL,
    amountGroups: rollout.totalGroups,
    groupsSettings: 'numberOfGroups',
  };

  if (!!groups && groups.length > 0) {
    const formGroups = groups.map((group) => ({
      name: group.name,
      targetFilterQuery: group.targetFilterQuery,
      successCondition: {
        condition: group.successCondition.condition,
        expression: Number(group.successCondition.expression),
      },
      errorCondition: {
        condition: group.errorCondition.condition,
        expression: Number(group.errorCondition.expression),
      },
      targetPercentage: group.targetPercentage,
    }));
    formData.groups = formGroups;
    formData.errorCondition = formGroups[0].errorCondition;
    formData.successCondition = formGroups[0].successCondition;
    formData.groupsSettings = 'advancedDefinition';
  }

  console.log({ formData });

  return formData;
}
