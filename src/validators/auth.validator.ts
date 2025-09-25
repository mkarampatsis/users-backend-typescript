import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional()
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});
