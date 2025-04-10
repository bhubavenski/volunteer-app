'use client';

import { useDrag, useDrop } from 'react-dnd';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import type { Sprint, Status, Task } from '@prisma/client';

interface SprintBoardProps {
  sprint: Sprint;
  tasks: Task[];
  handleMoveTaskInSprintStages: (
    taskId: string,
    newStatus: Status
  ) => Promise<void>;
  onMoveToBacklog: (taskId: string) => void;
}

export interface Column {
  id: Status;
  title: string;
}

export function SprintBoard({
  sprint,
  tasks,
  handleMoveTaskInSprintStages,
  onMoveToBacklog,
}: SprintBoardProps) {
  // Дефиниране на колоните
  const columns: Column[] = [
    { id: 'TODO', title: 'TODO' },
    { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
    { id: 'DONE', title: 'DONE' },
  ];

  // Форматиране на дати
  const formattedStartDate = new Date(sprint.startDate).toLocaleDateString(
    'bg-BG',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  const formattedEndDate = new Date(sprint.dueDate).toLocaleDateString(
    'bg-BG',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  // Групиране на задачи по статус
  const tasksByStatus = {
    TODO: tasks.filter((task) => task.status === 'TODO'),
    IN_PROGRESS: tasks.filter((task) => task.status === 'IN_PROGRESS'),
    DONE: tasks.filter((task) => task.status === 'DONE'),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{sprint.title}</h2>
          <Badge variant="outline">
            {formattedStartDate} - {formattedEndDate}
          </Badge>
        </div>
        <p className="text-muted-foreground">{sprint.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id]}
            handleMoveTaskInSprintStages={handleMoveTaskInSprintStages}
            onMoveToBacklog={onMoveToBacklog}
            otherColumns={columns.filter((c) => c.id !== column.id)}
            sprint={sprint}
          />
        ))}
      </div>
    </div>
  );
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  onMoveToBacklog: (taskId: string) => void;
  otherColumns: Column[];
  sprint: Sprint;
  handleMoveTaskInSprintStages: (
    taskId: string,
    newStatus: Status
  ) => Promise<void>;
}

function BoardColumn({
  column,
  tasks,
  onMoveToBacklog,
  otherColumns,
  handleMoveTaskInSprintStages,
}: BoardColumnProps) {
  // Добавяме loading state
  const [isLoading, setIsLoading] = useState(false);

  // Използваме useRef за да създадем референция
  const dropRef = useRef<HTMLDivElement>(null);

  // Настройка на drop target
  const [{ isOver }, drop] = useDrop({
    accept: ['SPRINT_TASK', 'BACKLOG_TASK'],
    drop: async (item: { id: string; status?: string }) => {
      console.log(`Dropping task ${item.id} into column ${column.id}`);

      // Показваме loading state
      setIsLoading(true);

      try {
        await handleMoveTaskInSprintStages(item.id, column.id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error updating task:', error);
        setIsLoading(false);
      }

      return { moved: true, columnId: column.id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Прилагаме drop функцията към референцията
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`bg-muted/40 rounded-lg p-3 h-[600px] overflow-y-auto flex flex-col ${
        isOver ? 'ring-2 ring-primary/20' : ''
      } ${isLoading ? 'relative' : ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 rounded-lg">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-muted/40 z-10 py-2">
        <h3 className="font-medium">{column.title}</h3>
        <Badge>{tasks.length}</Badge>
      </div>

      <div className="space-y-3 overflow-y-auto flex-grow pr-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleMoveTaskInSprintStages={handleMoveTaskInSprintStages}
            onMoveToBacklog={onMoveToBacklog}
            otherColumns={otherColumns}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex items-center justify-center p-4 border border-dashed rounded-lg bg-background/50 h-20">
            <p className="text-sm text-muted-foreground">Няма задачи</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  handleMoveTaskInSprintStages: (
    taskId: string,
    newStatus: Status
  ) => Promise<void>;
  onMoveToBacklog: (taskId: string) => void;
  otherColumns: Column[];
}

function TaskCard({
  task,
  handleMoveTaskInSprintStages,
  onMoveToBacklog,
  otherColumns,
}: TaskCardProps) {
  // Използваме useRef за да създадем референция
  const dragRef = useRef<HTMLDivElement>(null);

  // Настройка на drag and drop
  const [{ isDragging }, drag] = useDrag({
    type: 'SPRINT_TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Прилагаме drag функцията към референцията
  drag(dragRef);

  return (
    <Card
      ref={dragRef}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <CardHeader className="p-3 pb-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
                <span className="sr-only">Действия</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {otherColumns.map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => {
                    console.log(
                      `Moving task ${task.id} to column ${column.id}`
                    );
                    handleMoveTaskInSprintStages(task.id, column.id);
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Премести в {column.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => onMoveToBacklog(task.id)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Върни в Backlog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <Badge
          variant="outline"
          className={
            task.priority === 'HIGH'
              ? 'bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800'
              : task.priority === 'MID'
              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800'
              : 'bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
          }
        >
          {task.priority === 'HIGH'
            ? 'Висок'
            : task.priority === 'MID'
            ? 'Среден'
            : 'Нисък'}
        </Badge>
        {/* {task.userId && (
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            {task.userId.substring(0, 1).toUpperCase()}
          </div>
        )} */}
      </CardFooter>
    </Card>
  );
}
