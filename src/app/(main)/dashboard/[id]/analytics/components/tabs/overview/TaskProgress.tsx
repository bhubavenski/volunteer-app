import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';
import { InitiativeData } from '../../types';
import { Progress } from '@/components/ui/progress';

export default function TaskProgress({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  // TODO: opravi logikata tuk

  function groupTasksByCategory() {
    const tasks = initiativeData.tasks;
    const categoryMap = new Map<string, { name: string; completed: number }>();

    tasks.forEach((task) => {
      if (!categoryMap.has(task.category)) {
        categoryMap.set(task.category, { name: task.category, completed: 0 });
      }
    });

    const categoryStats = new Map<string, { total: number; done: number }>();

    tasks.forEach((task) => {
      if (!categoryStats.has(task.category)) {
        categoryStats.set(task.category, { total: 0, done: 0 });
      }
      const stats = categoryStats.get(task.category)!;
      stats.total += 1;
      if (task.status === 'DONE') {
        stats.done += 1;
      }
    });

    const result = Array.from(categoryStats.entries()).map(
      ([category, stats]) => ({
        name: category,
        completed: stats.total > 0 ? stats.done / stats.total : 0,
      })
    );

    return result;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Изпълнение на задачите</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groupTasksByCategory().map((task, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{task.name}</span>
                <span className="font-bold">{task.completed}%</span>
              </div>
              <Progress value={task.completed} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
