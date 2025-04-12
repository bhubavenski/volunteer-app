import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import { InitiativeData } from '../../types';

export default function VolunteersTab({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  const volunteersData = initiativeData.participants;

  return (
    <TabsContent value="volunteers" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Доброволци</CardTitle>
          <CardDescription>Участници в инициативата</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {volunteersData.map((volunteer) => (
              <div
                key={volunteer.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${volunteer.profileImg}`}
                    />
                    <AvatarFallback>{volunteer.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{volunteer.username}</h3>
                    <p className="text-sm text-muted-foreground">
                      {volunteer.role}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Часове</p>
                    <p className="font-medium">{volunteer.hours}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Задачи</p>
                    <p className="font-medium">{volunteer.tasks}</p>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
