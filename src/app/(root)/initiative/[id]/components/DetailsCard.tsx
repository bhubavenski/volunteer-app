import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import React from 'react';
import { InitiativeProps } from '../page';

export default function DetailsCard({
  initiative,
}: {
  initiative: InitiativeProps;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Детайли за инициативата</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>
              {initiative.date.toLocaleDateString('bg-BG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.participants} участници</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
