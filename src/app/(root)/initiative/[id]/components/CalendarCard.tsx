import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { InitiativeProps } from '../page';

export default function CalendarCard({
  initiative,
}: {
  initiative: InitiativeProps;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Календар</h2>
      <Calendar
        mode="single"
        selected={initiative.date}
        className="rounded-md border"
      />
    </div>
  );
}
