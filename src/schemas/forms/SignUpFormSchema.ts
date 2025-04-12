import { Role } from '@prisma/client';
import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  username: z.string().min(1),
  role: z.union([
    z.literal(Role.USER),
    z.literal(Role.INITIATOR),
    z.literal(Role.ADMIN),
  ]),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;
