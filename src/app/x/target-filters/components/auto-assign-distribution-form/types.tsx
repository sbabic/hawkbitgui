import { RolloutTypes } from '@/entities/rollout';
import { z } from 'zod';

export const AutoAssignDistributionSchema = z.object({
  targetFilterId: z.number(),
  enableAutoAssign: z.boolean(),
  autoAssignDistributionSet: z.number().optional(),
  autoAssignActionType: z.nativeEnum(RolloutTypes).optional(),
});
export type AutoAssignDistributionFormData = z.infer<typeof AutoAssignDistributionSchema>;
