import SignUpVolunteer from '@/app/(main)/initiative/[id]/components/SignUpVolunteer';
import LocationCard from '@/app/(main)/initiative/[id]/components/LocationCard';
import DetailsCard from '@/app/(main)/initiative/[id]/components/DetailsCard';
import { db } from '@/prisma/db';
import { notFound } from 'next/navigation';
import CarouselCard from './components/CarouselCard';
import { Prisma } from '@prisma/client';
import { sanitize } from '@/lib/utils';

export type InitiativeWithParticipantsCount = Prisma.InitiativeGetPayload<{
  select: {
    endDate: true;
    id: true;
    title: true;
    startDate: true;
    description: true;
    location: true;
    mapEmbedUrl: true;
    imagesUrls: true;
    _count: {
      select: {
        participants: true;
      };
    };
  };
}>;

export default async function InitiativePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const initiative = await db.initiative.findUnique({
    where: {
      id,
    },
    select: {
      endDate: true,
      id: true,
      title: true,
      startDate: true,
      description: true,
      location: true,
      mapEmbedUrl: true,
      imagesUrls: true,
      _count: {
        select: {
          participants: true,
        },
      },
    },
  });

  if (!initiative) {
    notFound();
  }

  return (
    <div className="container space-y-7 items-center max-w-[1000px] mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{initiative.title}</h1>

      <CarouselCard images={initiative.imagesUrls} />

      <DetailsCard initiative={initiative} />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitize(initiative.description) }}
        />
      </div>

      {/* <CalendarCard initiative={initiative} /> */}

      <LocationCard embed={initiative.mapEmbedUrl} />

      <SignUpVolunteer initiative={initiative} />
    </div>
  );
}
