'use client'

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
export const AuthProvider = ({ children, session }: { children: ReactNode, session?: Session | null}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
