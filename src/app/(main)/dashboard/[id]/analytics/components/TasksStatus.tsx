'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
  PieChart,
} from 'recharts';
import { InitiativeData } from './types';

export default function TasksStatus({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  const taskStatusCount = initiativeData.tasks?.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { DONE: 0, IN_PROGRESS: 0, PENDING: 0 } as Record<string, number>
  );

  const taskStatusData = [
    { name: 'Завършени', value: taskStatusCount.DONE, color: '#10b981' },
    { name: 'В процес', value: taskStatusCount.IN_PROGRESS, color: '#3b82f6' },
    // { name: 'Предстоящи', value: taskStatusCount.PENDING, color: '#f59e0b' },
  ];
  console.log({ taskStatusData });
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Статус на задачите</CardTitle>
        <CardDescription>Разпределение на задачите по статус</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {taskStatusData.some((taskStatus) => taskStatus.value !== 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div>
              <div>There are no activity with any task</div>
              <div>
                move some of the tasks to in-progress or done stages to get Pie
                chart analytics
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
