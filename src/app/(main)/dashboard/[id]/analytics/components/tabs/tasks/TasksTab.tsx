import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import { InitiativeData } from '../../types';
import { formatDate } from '@/lib/utils';

export default function TasksTab({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  const tasksData = initiativeData.tasks;
  return (
    <TabsContent value="tasks" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Списък със задачи</CardTitle>
          <CardDescription>
            Всички задачи в рамките на инициативата
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasksData.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          task.status === 'DONE'
                            ? 'bg-green-50 text-green-700'
                            : task.status === 'IN_PROGRESS'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }
                      >
                        {task.status === 'DONE'
                          ? 'Завършена'
                          : task.status === 'IN_PROGRESS'
                          ? 'В процес'
                          : 'Предстояща'}
                      </Badge>
                      {/* <Badge
                        variant="outline"
                        className={
                          task.priority === 'high'
                            ? 'bg-red-50 text-red-700'
                            : task.priority === 'medium'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-green-50 text-green-700'
                        }
                      >
                        {task.priority === 'high'
                          ? 'Висок приоритет'
                          : task.priority === 'medium'
                          ? 'Среден приоритет'
                          : 'Нисък приоритет'}
                      </Badge> */}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Краен срок:{' '}
                    {task.dueDate ? formatDate(task.dueDate) : 'няма'}
                  </div>
                </div>
                {task.assignedTo && (
                  <div className="flex items-center mt-3">
                    <span className="text-sm text-muted-foreground mr-2">
                      Отговорник:
                    </span>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${task.assignedTo.profileImg}`}
                        />
                        <AvatarFallback>
                          {task.assignedTo.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      {/* <span className="text-sm">{`${task.assignedTo.firstName} ${task.assignedTo.lastName}`}</span> */}
                      <span className="text-sm">{`${task.assignedTo.username}`}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
