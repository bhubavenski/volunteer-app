import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import React from 'react';
import AuthWrapper from './AuthWrapper';
import { AppLinks } from '@/constants/AppLinks';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className='h-24 w-36 relative bg black'>
          {/* <h1 className="text-2xl font-bold">ДоброволциБГ</h1> */}
          <Image src="/logo.png" alt="Dobrovolci Bg logo" fill className=' object-contain '/>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={AppLinks.INITIATIVES_LIST} className="hover:underline">
                Програми
              </Link>
            </li>
            <li>
              <a href="#benefits" className="hover:underline">
                Ползи
              </a>
            </li>
            <li>
              <a href="#signup" className="hover:underline">
                Запиши се
              </a>
            </li>
            <ModeToggle />
          </ul>
        </nav>
        <div className='space-x-2'>
          <AuthWrapper />
        </div>
      </div>
    </header>
  );
}
