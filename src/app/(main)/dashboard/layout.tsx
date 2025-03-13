import { AppLinks } from '@/constants/AppLinks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import HTTPErrorMessage from './components/HTTPErrorMessage';
import { db } from '@/prisma/db';
import { Button } from '@/components/ui/button';

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
    <div className="flex items-center justify-center inset-0 p-6 relative">
      <div className=" w-full h-full p-3 rounded-lg ">
        {hasInitiatives ? (
          <>{children}</>
        ) : (
          <div className="grid content-center">
            <HTTPErrorMessage
              href={AppLinks.CREATE_INITIATIVE}
              code="404"
              title="No Initiatives were found."
              description="Sorry, we can't find that page."
            >
              <Button>Hey</Button>
            </HTTPErrorMessage>
          </div>
        )}
      </div>
    </div>
  );
}
