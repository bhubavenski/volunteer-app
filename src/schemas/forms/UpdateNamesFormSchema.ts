import { z } from 'zod';

export const UpdateNamesFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type UpdateNamesFormSchemaValues = z.infer<typeof UpdateNamesFormSchema>;
