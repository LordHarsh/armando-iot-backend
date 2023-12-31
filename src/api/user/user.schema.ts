import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  image: z.string().optional(),
});

export type userType = z.infer<typeof userSchema>;
