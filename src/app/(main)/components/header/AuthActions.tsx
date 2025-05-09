'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import React from 'react';
import UserDropdownMenu from '../UserDropdownMenu';
import { useRouter } from 'next/navigation';
import { AppLinks } from '@/constants/AppLinks';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AuthActions() {
  const { data, status } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="w-16 h-10" />
      ) : data ? (
        <UserDropdownMenu
          username={data.user.username}
          profileId={data.user.sub!}
        />
      ) : isMobile ? (
        <Button onClick={() => router.push(AppLinks.SIGN_IN)}>Sign in</Button>
      ) : (
        <>
          <Button
            onClick={() => router.push(AppLinks.SIGN_UP)}
            variant="outline"
          >
            Sign up
          </Button>
          <Button onClick={() => router.push(AppLinks.SIGN_IN)}>Sign in</Button>
        </>
      )}
    </>
  );
}
