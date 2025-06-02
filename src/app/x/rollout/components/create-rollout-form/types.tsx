import { RolloutTypes, StartType } from '@/entities/rollout';
import { Condition } from '@/services/rollouts-service.types';
import { z } from 'zod';

const RolloutGroupSchema = z.object({
  name: z.string().min(1, { message: 'Group name is required' }),
  targetFilterQuery: z.string().min(1, { message: 'Target filter query is required' }),
  targetPercentage: z.number().min(1, { message: 'Target percentage must be greater than 0' }),
  successCondition: z.object({
    condition: z.literal(Condition.THRESHOLD),
    expression: z.number().int({ message: 'Trigger threshold must be a whole number' }).min(1, { message: 'Trigger threshold must be greater than 0' }),
  }),
  errorCondition: z.object({
    condition: z.literal(Condition.THRESHOLD),
    expression: z.number().min(1, { message: 'Error threshold must be greater than 0' }),
  }),
});
export type RolloutGroup = z.infer<typeof RolloutGroupSchema>;

export const CreateRolloutFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    distributionSetId: z.number({ message: 'Distribution set is required' }).min(1, { message: 'Distribution set is required' }),
    targetFilterQuery: z.string({ message: 'Custom target filter is required' }).min(1, { message: 'Custom target filter is required' }),
    description: z.string().optional(),
    type: z.nativeEnum(RolloutTypes, { message: 'Action type is required' }),
    forcetime: z.date().optional(),
    startType: z.nativeEnum(StartType, { message: 'Start type is required' }),
    startAt: z.date().optional(),
    selectedTargetsCount: z.number().min(1, { message: 'No targets in filter query' }),
    amountGroups: z.number({ message: 'Number of groups is required' }).min(1, { message: 'Number of groups is required' }).optional(),
    successCondition: z
      .object({
        condition: z.literal(Condition.THRESHOLD),
        expression: z.number().int({ message: 'Trigger threshold must be a whole number' }).min(1, { message: 'Trigger threshold must be greater than 0' }),
      })
      .optional(),
    errorCondition: z
      .object({
        condition: z.literal(Condition.THRESHOLD),
        expression: z.number().min(1, { message: 'Error threshold must be greater than 0' }),
      })
      .optional(),
    isErrorCount: z.boolean(),
    groups: z.array(RolloutGroupSchema).optional(),
  })
  .refine((data) => !(data.type === RolloutTypes.TIME_FORCED && !data.forcetime), {
    message: 'Forced action requires a forced time',
    path: ['forcetime'],
  })
  .refine((data) => !(data.groups === undefined && data.amountGroups === undefined), {
    message: 'Number of groups is required',
    path: ['amountGroups'],
  });

export type CreateRolloutFormData = z.infer<typeof CreateRolloutFormSchema>;
