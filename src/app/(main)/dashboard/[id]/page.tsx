'use client';

import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Task } from '@prisma/client';
import { Backlog } from './components/Backlog';
import { CreateSprintDialog } from './components/CreateSprintDialog';
import { CreateTaskDialog } from './components/CreateTaskDialog';
import { SprintBoard } from './components/SprintBoard';
import { Sprint } from './components/types';

export default function Page() {
  // Състояния за задачи, спринтове и диалози
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);

  // Зареждане на данни от localStorage при първоначално зареждане
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    const savedSprints = localStorage.getItem('kanban-sprints');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (savedSprints) {
      const parsedSprints = JSON.parse(savedSprints);
      setSprints(parsedSprints);

      // Задаване на активен спринт, ако има такъв
      if (parsedSprints.length > 0) {
        setActiveSprintId(parsedSprints[0].id);
      }
    }
  }, []);

  // Запазване на данни в localStorage при промяна
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-sprints', JSON.stringify(sprints));
  }, [sprints]);

  // Функция за добавяне на нова задача
  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsCreateTaskOpen(false);
  };

  // Функция за добавяне на нов спринт
  const handleAddSprint = (newSprint: Sprint) => {
    const updatedSprints = [...sprints, newSprint];
    setSprints(updatedSprints);
    setIsCreateSprintOpen(false);

    // Ако това е първият спринт, направете го активен
    if (updatedSprints.length === 1) {
      setActiveSprintId(newSprint.id);
    }
  };

  // Функция за преместване на задача между колоните в спринта
  const moveTaskInSprint = (
    taskId: string,
    newStatus: 'todo' | 'in-progress' | 'done'
  ) => {
    console.log(`Moving task ${taskId} to ${newStatus}`);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  // Функция за преместване на задача от backlog към спринт
  const moveTaskToSprint = (taskId: string, sprintId: string) => {
    console.log(`Moving task ${taskId} to sprint ${sprintId}`);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, sprintId, status: 'todo' } : task
    );
    setTasks(updatedTasks);
  };

  // Функция за връщане на задача от спринт в backlog
  const moveTaskToBacklog = (taskId: string) => {
    console.log(`Moving task ${taskId} back to backlog`);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, sprintId: null, status: null } : task
    );
    setTasks(updatedTasks);
  };

  // Филтриране на задачи за backlog (задачи без спринт)
  const backlogTasks = tasks.filter((task) => !task.sprintId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 min-h-screen">
        <div className="flex justify-between items-center mb-6">
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
                  {sprint.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="backlog" className="min-h-[600px]">
            <Backlog
              tasks={backlogTasks}
              sprints={sprints}
              onMoveToSprint={moveTaskToSprint}
            />
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
                onMoveTask={moveTaskInSprint}
                onMoveToBacklog={moveTaskToBacklog}
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
