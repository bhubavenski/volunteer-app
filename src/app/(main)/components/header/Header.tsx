import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import React from 'react';
import AuthActions from './AuthActions';
import AppLogo from '@/components/icons/AppLogo';
import { AppLinks } from '@/constants/AppLinks';
import AuthWrraper from './AuthWrraper';
import { Role } from '@prisma/client';

export default function Header() {
  return (
    <header className="py-1 flex bg-white dark:bg-[#020713] justify-between z-10 shadow-lg sticky top-0 items-center px-6">
      <Link href="/">
        <AppLogo width={150} height={70} className="dark:fill-white" />
      </Link>
      <nav className="mr-8">
        <ul className="flex items-center gap-4">
          <li>
            <AuthWrraper role={[Role.INITIATOR, Role.ADMIN]}>
              <Link
                href={AppLinks.CREATE_INITIATIVE}
                className="hover:underline"
              >
                Create initiative
              </Link>
            </AuthWrraper>
          </li>
          <li>
            <Link href={AppLinks.INITIATIVES_LIST} className="hover:underline">
              Programs
            </Link>
          </li>
          <li>
            <Link href={AppLinks.HOME_BENEFITS} className="hover:underline">
              Benefits
            </Link>
          </li>
          <ModeToggle />
        </ul>
      </nav>
      <div className="space-x-2">
        <AuthActions />
      </div>
    </header>
  );
}
