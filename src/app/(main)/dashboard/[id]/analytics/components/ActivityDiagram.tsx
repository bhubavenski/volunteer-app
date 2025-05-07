'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import React from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from 'recharts';

// Компонент за персонализиран tooltip за диаграмите
// {
//   active: string;
//   payload: { name: string; value: number; color: string }[];
//   label: string;
// }
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry:any, index:any) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityDiagram() {
  // {
  //   initiativeData,
  // }: {
  //   initiativeData: InitiativeData;
  // }
  const activityData = [
    { date: '2025-03-01', volunteers: 10, hours: 50 },
    { date: '2025-03-02', volunteers: 12, hours: 55 },
    { date: '2025-03-03', volunteers: 8, hours: 40 },
    // Добавяйте още дати и съответните данни за доброволци и часове
  ];
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Активност по дни</CardTitle>
        <CardDescription>
          Брой доброволци и отработени часове по дати
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="volunteers"
              name="Доброволци"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="hours"
              name="Часове"
              fill="#82ca9d"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
