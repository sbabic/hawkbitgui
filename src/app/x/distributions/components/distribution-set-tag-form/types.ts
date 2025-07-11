import { z } from 'zod';

export const DistributionSetTagSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string(),
  color: z.string().optional(),
});

export type DistributionSetTagFormData = z.infer<typeof DistributionSetTagSchema>;
