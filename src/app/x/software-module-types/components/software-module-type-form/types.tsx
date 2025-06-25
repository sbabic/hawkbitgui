import { z } from 'zod';

export const SoftwareModuleTypeFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  key: z.string().min(1),
  colour: z.string().optional(),
  maxAssignments: z.number().optional(),
});

export type SoftwareModuleTypeFormData = z.infer<typeof SoftwareModuleTypeFormSchema>;
