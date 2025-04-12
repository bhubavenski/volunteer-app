import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { InitiativeWithParticipantsCount } from '../page';

export default function CalendarCard({
  initiative,
}: {
  initiative: InitiativeWithParticipantsCount;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <Calendar
        mode="single"
        selected={initiative.startDate}
        className="rounded-md border"
      />
    </div>
  );
}
