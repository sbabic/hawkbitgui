import { z } from 'zod';

export const CreateTargetFilterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  query: z.string().min(1, { message: 'Query is required' }),
});
export type CreateTargetFilterFormData = z.infer<typeof CreateTargetFilterSchema>;
