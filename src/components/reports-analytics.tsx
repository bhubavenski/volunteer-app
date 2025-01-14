import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const programSuccessData = [
  { name: "Програма A", completed: 40, ongoing: 20 },
  { name: "Програма B", completed: 30, ongoing: 25 },
  { name: "Програма C", completed: 20, ongoing: 15 },
  { name: "Програма D", completed: 15, ongoing: 10 },
  { name: "Програма E", completed: 10, ongoing: 5 },
];

const volunteerParticipationData = [
  { month: "Ян", volunteers: 50 },
  { month: "Фев", volunteers: 60 },
  { month: "Мар", volunteers: 75 },
  { month: "Апр", volunteers: 90 },
  { month: "Май", volunteers: 100 },
  { month: "Юни", volunteers: 120 },
];

export function ReportsAnalytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Отчети и анализи</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Успех на програми</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={programSuccessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#8884d8" name="Завършени" />
                <Bar dataKey="ongoing" fill="#82ca9d" name="В процес" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Участие на доброволци</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={volunteerParticipationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="volunteers" stroke="#8884d8" name="Брой доброволци" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Експорт на отчети (CSV)</Button>
        <Button variant="outline">Експорт на отчети (PDF)</Button>
      </div>
    </div>
  )
}

