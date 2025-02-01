import React from 'react';
import { Initiative } from '@prisma/client';
import { Calendar } from '@/components/ui/calendar';

export default function CalendarCard({
  initiative,
}: {
  initiative: Initiative;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Календар</h2>
      <Calendar
        mode="single"
        selected={initiative.scheduledDate}
        className="rounded-md border"
      />
    </div>
  );
}
