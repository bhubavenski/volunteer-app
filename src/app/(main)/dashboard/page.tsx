import { Button } from '@/components/ui/button';
import { FolderDot} from 'lucide-react';
import React from 'react';
import TasksDashboard from './components/TasksDashboard';
import AddTaskDialog from './components/AddTaskDialog';

/*
ot tuk she se suzdavat novi iniciative
razglejdat suzdadeni
razglevjdat se hora
i statistiki
*/
export default function page() {
  return (
    <div className="flex items-center bg-red-400 justify-center absolute inset-0 px-6">
      <div className=" w-full bg-[#363535] min-h-48 flex p-3 gap-3 rounded-lg">
        <nav className="flex flex-col gap-3">
          <AddTaskDialog/>
          <Button className="flex gap-1 items-center">
            <FolderDot />
            My Activities
          </Button>
        </nav>
        <TasksDashboard />
      </div>
    </div>
  );
}
