'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { type Task } from '../../[id]/components/TasksDashboard';

import TaskDialog from './TaskDialog';
import { AssignTo } from './AssignTo';

export default function Task({ task }: { task: Task }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Card className="cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex flex-col p-4">
          <CardTitle className="text-sm mb-2">{task.title}</CardTitle>
          <div className="flex justify-end items-center mt-2">
            <AssignTo />
            {/** <span className="text-xs text-gray-500 mr-2">Assign to:</span>
            {task.assignedTo?.profileImg ? (
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${task.assignedTo.profileImg}`}
                />
                <AvatarFallback>
                  {task.assignedTo} 
                  !!!
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-6 w-6">
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            )} */}
          </div>
        </CardHeader>
      </Card>
      <TaskDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title={task.title}
        description={task.description ?? ''}
      />
    </div>
  );
}
