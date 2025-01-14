import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import React from 'react';
import AuthWrapper from './AuthWrapper';

export default function Header() {
  return (
    <header className="py-4 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">ДоброволциБГ</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <a href="#programs" className="hover:underline">
                Програми
              </a>
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
