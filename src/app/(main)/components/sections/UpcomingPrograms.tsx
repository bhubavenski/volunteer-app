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
      id: true,
      actionDate: true,
      location: true,
      title: true,
      excerpt: true,
      categories: true,
      imagesUrls: true,
    },
  });

  return (
    <section className="py-16 -mx-6 bg-muted px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Upcoming volunteer programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} initiative={program} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
