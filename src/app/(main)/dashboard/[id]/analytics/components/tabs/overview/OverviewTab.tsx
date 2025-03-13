import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import InitativeDescriptoin from './InitativeDescriptoin';
import { InitiativeData } from '../../types';
import TaskProgress from './TaskProgress';

export default function OverviewTab({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <InitativeDescriptoin initiativeData={initiativeData} />

        <TaskProgress initiativeData={initiativeData} />
      </div>

      {/* <Card>
        <CardHeader>
          <CardTitle>Тенденция в активността</CardTitle>
          <CardDescription>
            Брой доброволци и отработени часове през времето
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="volunteers"
                name="Доброволци"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                name="Часове"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </TabsContent>
  );
}
