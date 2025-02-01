import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import React from 'react';
import AuthWrapper from './AuthWrapper';
import Image from 'next/image';
import AppLogo from '@/components/icons/AppLogo';
import { AppLinks } from '@/constants/AppLinks';

export default function Header() {
  return (
    <header className="py-3 flex justify-between items-center px-6">
      <Link href="/">
        {/* <h1 className="text-2xl font-bold">ДоброволциБГ</h1> */}
        {/* <Image className='dark:' src="/Free-Logo-_from-www.logo.im_-_1_.svg" width={150} height={150} alt='logo' /> */}
        <AppLogo width={150} height={70} className="dark:fill-white" />
      </Link>
      <nav className="mr-8">
        <ul className="flex items-center gap-4">
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
          <li>
            <Link href={AppLinks.SIGN_UP} className="hover:underline">
              Sign up
            </Link>
          </li>
          <ModeToggle />
        </ul>
      </nav>
      <div className="space-x-2">
        <AuthWrapper />
      </div>
    </header>
  );
}
