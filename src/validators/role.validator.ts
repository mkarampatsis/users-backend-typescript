import { z } from 'zod';

export const createRoleSchema = z.object({
  role: z.string().min(2),
  description: z.string().optional(),
  active: z.boolean().optional()
});

export const updateRoleSchema = createRoleSchema.partial();
