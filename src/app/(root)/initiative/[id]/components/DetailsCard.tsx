import { Card, CardContent } from '@/components/ui/card';
import { Initiative, Prisma } from '@prisma/client';
import { CalendarIcon, MapPin, Users } from 'lucide-react';
import React from 'react';

export default function DetailsCard({
  initiative,
}: {
  initiative: Initiative;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Детайли за инициативата</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>
              {initiative.scheduledDate.toLocaleDateString('bg-BG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {/* <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.time}</span>
          </div> */}
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            {/* {initiative.participants} */}
            <span>10 участници</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
