'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { AppLinks } from '@/constants/AppLinks';

export default function UserDropdownMenu({
  username,
  profileId,
}: {
  username: string;
  profileId: string;
}) {
  const profileLinks: { href: string; label: string }[] = [
    {
      href: `/profile/${profileId}`,
      label: 'settings',
    },
  ];
  console.log({ username });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer rounded-lg">
          <AvatarImage src="/" alt="User avatar" />
          <AvatarFallback className="rounded-lg">
            <User data-testid={'profile-dropdown-trigger'} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => (
          <DropdownMenuItem asChild key={link.label} className="cursor-pointer">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex justify-between">
          <Link href={AppLinks.DASHBOARD}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer flex justify-between"
        >
          <LogOut width={18} height={18} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
