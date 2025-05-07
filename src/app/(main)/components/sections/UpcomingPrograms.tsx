import React from 'react';
import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';
import { SmallProgramCard } from '@/components/small-img-card';
import NoInitiativesFound from '../../initiatives/components/NoInitiativesFound';

export type Program = Prisma.InitiativeGetPayload<{
  select: {
    id: true;
    title: true;
    excerpt: true;
    endDate: true;
    location: true;
    imagesUrls: true;
  };
}>;
export default async function UpcomingPrograms() {
  const programs: Program[] = await db.initiative.findMany({
    orderBy: {
      startDate: 'desc',
    },
    take: 3,
    select: {
      id: true,
      title: true,
      excerpt: true,
      endDate: true,
      location: true,
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
          {programs.length ? (
            programs.map((program) => {
              console.log(program)
              return (
                <SmallProgramCard
                  key={program.id}
                  id={program.id}
                  title={program.title}
                  description={program.excerpt}
                  date={new Date(program.endDate).toLocaleDateString('bg-BG')} // или ISO формат, ако предпочиташ
                  location={program.location}
                  imageUrl={program.imagesUrls[0]}
                />
              );
            })
          ) : (
            <NoInitiativesFound />
          )}
        </div>
      </div>
    </section>
  );
}
