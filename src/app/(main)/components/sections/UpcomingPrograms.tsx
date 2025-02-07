import React from 'react';
import { ProgramCard } from '../program-card';
import { db } from '@/prisma/db';

export default async function UpcomingPrograms() {
  const programs = await db.initiative.findMany({
    orderBy: {
      actionDate: 'desc',
    },
    take: 3,
    select: {
      actionDate: true,
      location: true,
      title: true,
      excerpt: true,
    }
  });
  
  return (
    <section className="py-16 -mx-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Предстоящи доброволчески програми
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} initiative={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
