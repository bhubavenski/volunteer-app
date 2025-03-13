import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import { InitiativeData } from '../../types';

export default function ImpactTab({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  return (
    <TabsContent value="impact" className="space-y-4">
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Засадени дървета
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {initiativeData.impact.treesPanted}
            </div>
            <p className="text-xs text-muted-foreground">от планирани 500</p>
            <Progress
              value={(initiativeData.impact.treesPanted / 500) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Подобрена площ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {initiativeData.impact.areaImproved}
            </div>
            <p className="text-xs text-muted-foreground">
              от планирани 4 хектара
            </p>
            <Progress value={(2.5 / 4) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Намален CO2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {initiativeData.impact.co2Reduced}
            </div>
            <p className="text-xs text-muted-foreground">очакван ефект</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Засегнати хора
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {initiativeData.impact.peopleImpacted}
            </div>
            <p className="text-xs text-muted-foreground">ползватели на парка</p>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle>Екологично въздействие</CardTitle>
          <CardDescription>
            Очаквано въздействие върху околната среда
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Засаждането на 500 дървета в парк Борисова градина ще има
              значително положително въздействие върху околната среда и
              качеството на живот в района. Ето някои от очакваните ползи:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Подобряване на качеството на въздуха чрез абсорбиране на
                замърсители
              </li>
              <li>
                Намаляване на градския топлинен остров през летните месеци
              </li>
              <li>Създаване на местообитания за градска дива природа</li>
              <li>Подобряване на естетическата стойност на парка</li>
              <li>Намаляване на шумовото замърсяване</li>
              <li>
                Подобряване на психическото здраве на посетителите на парка
              </li>
            </ul>
            <p>
              Дългосрочното въздействие включва намаляване на въглеродния
              отпечатък на града и принос към борбата с климатичните промени.
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
