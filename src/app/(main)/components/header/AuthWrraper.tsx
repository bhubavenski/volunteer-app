'use client';

import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

// create roles and make them as enums
export default function AuthWrraper({
  children,
  role = [Role.USER],
}: {
  children: ReactNode;
  role?: Role[];
}) {
  const { data } = useSession();
  return role.some((r) => r === data?.user.role) && <>{children}</>;
}
