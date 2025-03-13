import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, ArrowUpRight } from 'lucide-react';
import React from 'react';

export default function AnaliticsCard({initiativeData}:{initiativeData:any}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Доброволци</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {initiativeData.totalVolunteers}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-500 font-medium flex items-center">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            +8 от миналата седмица
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
