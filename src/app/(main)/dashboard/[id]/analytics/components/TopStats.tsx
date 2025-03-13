import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Progress } from '@radix-ui/react-progress';
import { Users, ArrowUpRight, Clock, CheckSquare } from 'lucide-react';
import React from 'react';
import { InitiativeData } from './types';

export default function TopStats({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Доброволци</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {/* TODO i am not sure if this should be length or count */}
            {initiativeData.participants.length}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +8 от миналата седмица
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Отработени часове
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{initiativeData.totalHours}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +48 от миналата седмица
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Изпълнени задачи
          </CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {initiativeData.doneTasksCount}/{initiativeData._count.tasks}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +5 от миналата седмица
            </span>
          </p>
        </CardContent>
      </Card>
      {/* make it as product backlog */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Общ прогрес</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{initiativeData.progress}%</div>
          <Progress value={initiativeData.progress} className="h-2" />
        </CardContent>
      </Card> */}
    </div>
  );
}
