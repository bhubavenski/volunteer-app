import { db } from '@/prisma/db';
import { $Enums, Prisma } from '@prisma/client';
import Task from './Task/Task';
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
type GroupedTasks = Record<$Enums.Status, Task[]>;

export default async function TasksDashboard() {
  const tasks = await db.task.findMany({
    where: {
      initiativeId: '8b877188-3b5a-42ec-8895-7b55b088cd14',
    },
    include: {
      assignedTo: {
        select: {
          profileImg: true,
        },
      },
    },
  });

  const groupedTasks: GroupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }

    acc[task.status].push(task);

    return acc;
  }, {} as GroupedTasks);

  return (
    <div className="grid grid-cols-3 gap-5 flex-1 text-white">
      {Object.keys(groupedTasks).map((status) => {
        const currentTasks = groupedTasks[status as $Enums.Status];

        return (
          <div key={status}>
            <h2 className="font-semibold mb-2">{status}</h2>

            <div className="bg-gray-100 p-2 rounded-lg flex flex-col gap-3 min-h-[200px] transition-colors duration-200">
              {currentTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
