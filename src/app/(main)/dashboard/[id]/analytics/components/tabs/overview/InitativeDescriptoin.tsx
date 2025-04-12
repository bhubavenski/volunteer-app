import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Users, MapPin } from 'lucide-react';
import React from 'react';
import { InitiativeData } from '../../types';
import { formatDate } from '@/lib/utils';

export default function InitativeDescriptoin({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Описание на инициативата</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{initiativeData.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Начална дата
            </h4>
            <p className="flex items-center mt-1">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              {formatDate(initiativeData.startDate)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Крайна дата
            </h4>
            <p className="flex items-center mt-1">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              {formatDate(initiativeData.endDate)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Координатор
            </h4>
            <p className="flex items-center mt-1">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              {initiativeData.author.username}
              Bobkata
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Локация
            </h4>
            <p className="flex items-center mt-1">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              {initiativeData.location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
