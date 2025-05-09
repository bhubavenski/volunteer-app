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
    <header className="py-1 overflow-hidden flex bg-white dark:bg-[#020713] justify-between z-10 shadow-lg sticky top-0 items-center px-6">
      <Link href="/" className="max-sm:hidden">
        <AppLogo
          width={150}
          height={70}
          className="dark:fill-white max-sm:hidden"
        />
      </Link>
      <nav className="mr-8 max-sm:text-sm">
        <ul className="flex items-center gap-4">
          <li>
            <AuthWrraper role={[Role.INITIATOR, Role.ADMIN]}>
              <Link
                href={AppLinks.CREATE_INITIATIVE}
                className="hover:underline font-bold"
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
