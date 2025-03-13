import React, { ReactNode } from 'react';
import { VerticalNavbar } from './analytics/components/NavMenu';

export default async function layout({
  params,
  children
}: {
  params: Promise<{ id: string }>;
  children: ReactNode
}) {

  const { id } = await params;
  return (
    <div className="flex gap-3">
      <VerticalNavbar dashboardId={id} />

      <div className="flex-1">{children}</div>
    </div>
  );
}
