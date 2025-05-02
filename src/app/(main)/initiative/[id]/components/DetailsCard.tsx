import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import React from 'react';
import { InitiativeWithParticipantsCount } from '../page';
import { formatDate } from '@/lib/utils';

export default function DetailsCard({
  initiative,
}: {
  initiative: InitiativeWithParticipantsCount;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Initiative&apos;s Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>
              {initiative.startDate.toLocaleDateString('en-En', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{`до ${formatDate(initiative.endDate)}`}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{initiative.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{`${initiative._count.participants} participants`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
