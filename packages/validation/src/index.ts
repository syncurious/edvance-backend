import { z } from 'zod';

export const schoolStatusSchema = z.enum(['active', 'inactive']);
export const schoolFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'School name is required.')
    .max(160, 'School name is too long.'),
  status: schoolStatusSchema,
});
export type SchoolFormInput = z.infer<typeof schoolFormSchema>;
