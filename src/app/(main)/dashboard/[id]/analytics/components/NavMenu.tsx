'use client';

import { usePathname } from 'next/navigation';
import { Home, FileText, ChartNoAxesColumn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AppLinks } from '@/constants/AppLinks';
import Link from 'next/link';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface VerticalNavbarProps {
  className?: string;
  dashboardId: string;
}

export function VerticalNavbar({
  className,
  dashboardId,
}: VerticalNavbarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: 'Tasks dashboard',
      href: `${AppLinks.DASHBOARD}/${dashboardId}`,
      icon: <Home className="size-5" />,
    },
    {
      title: 'Initiative analytics',
      href: `${AppLinks.DASHBOARD}/${dashboardId}/analytics`,
      icon: <ChartNoAxesColumn className="size-5" />,
    },
    {
      title: 'Docs',
      href: `${AppLinks.DASHBOARD}/${dashboardId}/docs`,
      icon: <FileText className="size-32" />,
    },
  ];

  return (
    <nav
      className={cn(
        'flex h-full w-16 flex-col items-center border-r bg-background py-4',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <span className="text-lg font-bold">ZD</span>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Button
              key={item.title}
              variant={isActive ? 'secondary' : 'ghost'}
              size="icon"
              className={cn('h-10 w-10 rounded-full', {
                'bg-secondary text-secondary-foreground': isActive,
                'hover:bg-muted': !isActive,
              })}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="sr-only">{item.title}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
