'use client';

import { Button } from '@/components/ui/button';

export default function LayoutNav() {
  return (
    <nav className="flex flex-col gap-3 flex-1">
      {/* <AddTaskDialog />
      <Button className="flex gap-1 items-center">
        <FolderDot />
        My Activities
      </Button> */}
      <Button>Add initiative</Button>
    </nav>
  );
}
