import { AppLinks } from '@/constants/AppLinks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user.sub) {
    redirect(AppLinks.SIGN_IN);
  }

  return (
    <div className="flex items-center justify-center inset-0 p-6 max-sm:p-0 relative">
      <div className=" w-full h-full p-3 rounded-lg ">
          {children}
      </div>
    </div>
  );
}
