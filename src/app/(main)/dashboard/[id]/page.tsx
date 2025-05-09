'use client';

import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import { Prisma, Sprint, Status, Task } from '@prisma/client';

import { CreateSprintDialog } from './components/CreateSprintDialog';
import { CreateTaskDialog } from './components/CreateTaskDialog';

import {
  createTask,
  getTasks,
  updateTaskInSprintStages,
  updateTaskToBacklog,
  updateTaskToSprint,
} from '@/actions/tasks.actions';
import { useParams } from 'next/navigation';
import {
  createSprint,
  CreateSprintResult,
  getSprints,
} from '@/actions/sprints.actions';
import { Backlog } from './components/Backlog';
import { SprintBoard } from './components/SprintBoard';

export default function Page() {
  // Състояния за задачи, спринтове и диалози
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<{
    state: 'loading' | 'error' | 'success' | null;
    error: string | null;
  }>({
    state: null,
    error: null,
  });

  // initiatilize tasks and sprints
  useEffect(() => {
    async function init() {
      setStatus({
        state: 'loading',
        error: null,
      });
      const tasksResponse = await getTasks({
        where: {
          initiativeId: id,
        },
        include: {
          assignedTo: true,
        },
      });
      const sprintsResponse = await getSprints({
        where: {
          initiativeId: id,
        },
      });
      console.log({ sprintsResponse, tasksResponse });

      if (!tasksResponse.success || !sprintsResponse.success) {
        setStatus({
          state: 'error',
          error: null,
        });
        return;
      }

      setStatus({
        state: 'success',
        error: null,
      });

      setTasks(tasksResponse.result);
      localStorage.setItem('tasks', JSON.stringify(tasksResponse.result));

      setSprints(sprintsResponse.result);
      localStorage.setItem('sprints', JSON.stringify(sprintsResponse.result));

      if (sprintsResponse.result.length > 0) {
        setActiveSprintId(sprintsResponse.result[0].id);
        localStorage.setItem('activeSprintId', sprintsResponse.result[0].id);
      }
    }
    init();
  }, [id, setActiveSprintId]);

  // Запазване на данни в localStorage при промяна
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-sprints', JSON.stringify(sprints));
  }, [sprints]);

  // Функция за добавяне на нова задача
  const handleAddTask = async (newTask: Prisma.TaskCreateInput) => {
    console.log('handleraddtaks=', newTask);
    const response = await createTask(id, newTask);

    if (!response.success) {
      console.log('Error occurred in handleAddTask', response.error);
      return;
    }

    setTasks([...tasks, response.result]);
    setIsCreateTaskOpen(false);
  };

  // Функция за добавяне на нов спринт
  const handleAddSprint = async (
    newSprint: Parameters<CreateSprintResult>[1]
  ) => {
    const response = await createSprint(id, newSprint);

    if (!response.success) {
      console.log('Error accured in handleAddSprint', response.error);
      return;
    }

    setSprints([...sprints, response.result]);
    setIsCreateSprintOpen(false);
  };

  // Функция за преместване на задача между спринтовете
  const handleOnMoveToSprint = async (taskId: string, newSprintId: string) => {
    console.log(`Moving task ${taskId} to srpint: ${newSprintId}`);

    // Извикваме функцията за актуализиране на базата данни
    const result = await updateTaskToSprint(taskId, newSprintId);

    if (result.success) {
      // Актуализираме локалното състояние
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, sprintId: newSprintId } : t
      );
      setTasks(updatedTasks);
    } else {
      console.error('Failed to update task:', result.error);
    }
  };

  // Функция за преместване на задача между колоните в спринта
  const handleMoveTaskInSprintStages = async (
    taskId: string,
    newStatus: Status
  ) => {
    console.log(
      `Moving task ${taskId} to sprint ${activeSprintId!} with status ${newStatus}`
    );

    const response = await updateTaskInSprintStages(taskId, newStatus);

    if (response.success) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, sprintId: activeSprintId!, status: newStatus }
          : task
      );
      setTasks(updatedTasks);
    } else {
      console.error('Failed to move task to sprint:', response.error);
    }
  };

  // Функция за преместване на задача към баклог
  const handleMoveTaskToBacklog = async (taskId: string) => {
    console.log(`Moving task ${taskId} to backlog`);

    const response = await updateTaskToBacklog(taskId);

    if (response.success) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, sprintId: null } : task
      );
      setTasks(updatedTasks);
    } else {
      console.error('Failed to move task to backlog:', response.error);
    }
  };

  // Филтриране на задачи за backlog (задачи без спринт)
  const backlogTasks = tasks.filter((task) => !task.sprintId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 min-h-screen">
        <div className="flex justify-between items-center mb-6 max-sm:flex-col gap-2">
          <h1 className="text-3xl font-bold">Kanban Дъска</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setIsCreateTaskOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Нова задача
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCreateSprintOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Нов спринт
            </Button>
          </div>
        </div>

        <Tabs defaultValue="backlog" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="backlog">Backlog</TabsTrigger>
              {sprints.map((sprint) => (
                <TabsTrigger
                  key={sprint.id}
                  value={sprint.id}
                  onClick={() => setActiveSprintId(sprint.id)}
                >
                  {sprint.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="backlog" className="min-h-[600px]">
            {status.state === 'loading' ? (
              <div>Зареждане...</div>
            ) : status.state === 'error' ? (
              <div className="text-red-500">There no tasks</div>
            ) : (
              <Backlog
                tasks={backlogTasks}
                sprints={sprints}
                onMoveToSprint={handleOnMoveToSprint}
              />
            )}
          </TabsContent>

          {sprints.map((sprint) => (
            <TabsContent
              key={sprint.id}
              value={sprint.id}
              className="min-h-[600px]"
            >
              <SprintBoard
                sprint={sprint}
                tasks={tasks.filter((task) => task.sprintId === sprint.id)}
                handleMoveTaskInSprintStages={handleMoveTaskInSprintStages}
                onMoveToBacklog={handleMoveTaskToBacklog}
              />
            </TabsContent>
          ))}
        </Tabs>

        <CreateTaskDialog
          open={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}
          onAddTask={handleAddTask}
        />

        <CreateSprintDialog
          open={isCreateSprintOpen}
          onOpenChange={setIsCreateSprintOpen}
          onAddSprint={handleAddSprint}
        />
      </div>
    </DndProvider>
  );
}
