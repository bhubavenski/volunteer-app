'use client';

import { Button } from '@/components/ui/button';
import { FolderDot, Plus } from 'lucide-react';
import React from 'react';

/*
ot tuk she se suzdavat novi iniciative
razglejdat suzdadeni
razglevjdat se hora
i statistiki
*/
export default function page() {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <div className="min-w-[1000px] bg-[#363535] min-h-48 flex p-3 rounded-lg">
        <nav className="flex flex-col gap-3">
          <Button className="flex gap-1 items-center">
            <Plus />
            Create Activiti
          </Button>
          <Button className="flex gap-1 items-center">
            <FolderDot />
            My Activities
          </Button>
        </nav>
        <div className="grid grid-cols-3">
          <div>
            <span>Tasks</span>
          </div>

          <div>
            <span>In progress</span>
          </div>
          <div>
            <span>Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
