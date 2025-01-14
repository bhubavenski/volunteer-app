import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  username: z.string().min(1),
  role: z.union([
    z.literal('user'),
    z.literal('organizator'),
    z.literal('admin'),
  ]),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;
