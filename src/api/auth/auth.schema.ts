import { z } from 'zod';

export const createUserSchema = z.object({
  firstname: z.string().min(2).max(30),
  lastname: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});
