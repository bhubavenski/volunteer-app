'use client'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export default function InitiativeCardSkeleton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div className={cn('w-[500px] h-[200px]', { 'bg-black': open })}>
      InitiativeCardSkeleton
    </div>
  );
}
