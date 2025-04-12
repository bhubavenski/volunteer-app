import { Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DasboardHeader from './DasboardHeader';
import { db } from '@/prisma/db';
import TopStats from './TopStats';
import TasksStatus from './TasksStatus';
import OverviewTab from './tabs/overview/OverviewTab';
import TasksTab from './tabs/tasks/TasksTab';
import VolunteersTab from './tabs/volunteers/VolunteersTab';
import ImpactTab from './tabs/impact/ImpactTab';
import ActivityDiagram from './ActivityDiagram';
import { InitiativeData } from './types';

export default async function InitiativeDashboard({
  initiativeId,
}: {
  initiativeId: string;
}) {
  const initiative = await db.initiative.findUnique({
    where: {
      id: initiativeId,
    },
    include: {
      author: true,
      categories: {
        select: {
          name: true,
        },
      },
      participants: true,
      tasks: {
        include: {
          assignedTo: true,
        },
      },
      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  const doneTasksCount = await db.task.count({
    where: {
      initiativeId,
      status: 'DONE',
    },
  });

  const initiativeData = {
    ...initiative,
    doneTasksCount,
  } as InitiativeData;

  if (!initiativeData) {
    return <>Mne</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          {/* ok */}
          <DasboardHeader initiativeData={initiativeData} />

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Сподели
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Свържи се
            </Button>
          </div>
        </div>

        <TopStats initiativeData={initiativeData} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* <ActivityDiagram /> */}

          <TasksStatus initiativeData={initiativeData} />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Общ преглед</TabsTrigger>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="volunteers">Доброволци</TabsTrigger>
            <TabsTrigger value="impact">Въздействие</TabsTrigger>
          </TabsList>

          <OverviewTab initiativeData={initiativeData} />

          <TasksTab initiativeData={initiativeData} />

          <VolunteersTab initiativeData={initiativeData} />

          <ImpactTab initiativeData={initiativeData} />
        </Tabs>
      </div>
    </div>
  );
}
