import { z } from 'zod';

export const CreateDistributionSetSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  version: z.string().min(1, { message: 'Version is required' }),
  locked: z.boolean(),
  requiredMigrationStep: z.boolean(),
  modules: z.array(z.object({ id: z.number() })),
  type: z.string().min(1, { message: 'Type is required' }),
});

export type CreateDistributionSetFormData = z.infer<typeof CreateDistributionSetSchema>;
