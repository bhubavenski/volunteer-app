import { AppLinks } from '@/constants/AppLinks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import NoInitiativeFound from './components/NoInitiativeFound';
import { db } from '@/prisma/db';

/*
ot tuk she se suzdavat novi iniciative
razglejdat suzdadeni
razglevjdat se hora
i statistiki
*/
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user.sub) {
    redirect(AppLinks.SIGN_IN);
  }

  const hasInitiatives =
    (await db.initiative.findFirst({
      where: {
        author: { id: session.user.sub },
      },
    })) !== null;

  return (
    <div className="flex items-center justify-center absolute inset-0 p-6">
      <div className=" w-full min-h-full p-3 rounded-lg ">
        {hasInitiatives ? (
          <>{children}</>
        ) : (
          <div className="grid content-center">
            <NoInitiativeFound />
          </div>
        )}
      </div>
    </div>
  );
}
