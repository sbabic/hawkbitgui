import { z } from 'zod';

export const CreateSoftwareModuleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  version: z.string().min(1, { message: 'Version is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  description: z.string().optional(),
  vendor: z.string().optional(),
  encrypted: z.boolean().optional(),
});

export type CreateSoftwareModuleFormData = z.infer<typeof CreateSoftwareModuleSchema>;
