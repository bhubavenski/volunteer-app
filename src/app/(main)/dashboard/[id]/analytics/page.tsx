import React from 'react';
// import { VerticalNavbar } from './components/NavMenu';
import { Prisma } from '@prisma/client';
// import Dashboard from './components/dashboards/Dashboard';
import _Dashboard from './components/_Dashboard';

// TODO: write only once this options and use Prisma validator
export type Task = Prisma.TaskGetPayload<{
  where: {
    initiativeId: '8b877188-3b5a-42ec-8895-7b55b088cd14';
  };
  include: {
    assignedTo: {
      select: {
        profileImg: true;
      };
    };
  };
}>;
// type GroupedTasks = Record<$Enums.Status, Task[]>;

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const tasks = await db.task.findMany({
  //   where: {
  //     initiativeId: id,
  //   },
  //   include: {
  //     assignedTo: {
  //       select: {
  //         profileImg: true,
  //       },
  //     },
  //   },
  // });

  // const groupedTasks: GroupedTasks = tasks.reduce((acc, task) => {
  //   if (!acc[task.status]) {
  //     acc[task.status] = [];
  //   }

  //   acc[task.status].push(task);

  //   return acc;
  // }, {} as GroupedTasks);
  // const groupedTasksArr = Object.keys(groupedTasks);
  return (
    // <div className="flex h-screen">
    //   <main className="flex-1 p-6">
    //     <h1 className="text-2xl font-bold">Dashboard</h1>
    //     <p className="mt-2 text-muted-foreground">Welcome to your dashboard</p>
    //     <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    //       {groupedTasksArr.map((status) => (
    //         <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
    //           <div className="h-32 rounded-md bg-muted" />
    //           <h2 className="mt-2 font-semibold">Card {i + 1}</h2>
    //           <p className="text-sm text-muted-foreground">
    //             Card description goes here
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   </main>
    // </div>
    <_Dashboard initiativeId={id} />

  );
}
