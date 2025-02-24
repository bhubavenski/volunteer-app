'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import React, { useState } from 'react';
import { type Task } from '../TasksDashboard';

import TaskDialog from './TaskDialog';

export default function Task({ task }: { task: Task }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <div>
      <Card className="cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex flex-col p-4">
          <CardTitle className="text-sm mb-2">{task.content}</CardTitle>
          <div className="flex justify-end items-center mt-2">
            <span className="text-xs text-gray-500 mr-2">Assign to:</span>
            {task.assignedTo?.profileImg ? (
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${task.assignedTo.profileImg}`}
                />
                <AvatarFallback>
                  {/* {task.assignedTo} */}
                  !!!
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-6 w-6">
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardHeader>
      </Card>
      <TaskDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} content={task.content} description={task.description ?? ''}/>
    </div>
  );
}
