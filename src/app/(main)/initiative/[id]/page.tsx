import SignUpVolunteer from '@/app/(main)/initiative/[id]/components/SignUpVolunteer';
import LocationCard from '@/app/(main)/initiative/[id]/components/LocationCard';
import DetailsCard from '@/app/(main)/initiative/[id]/components/DetailsCard';
import { db } from '@/prisma/db';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';

export type InitiativeWithParticipantsCount = Prisma.InitiativeGetPayload<{
  select: {
    title: true;
    actionDate: true;
    description: true;
    location: true;
    mapEmbedUrl: true;
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

  const initiative: InitiativeWithParticipantsCount | null =
    await db.initiative.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        actionDate: true,
        description: true,
        location: true,
        mapEmbedUrl: true,
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

      {/* <CarouselCard initiative={initiative} /> */}

      <DetailsCard initiative={initiative} />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-muted-foreground">{initiative.description}</p>
      </div>

      {/* <CalendarCard initiative={initiative} /> */}

      <LocationCard embed={initiative.mapEmbedUrl} />

      <SignUpVolunteer initiative={initiative} />
    </div>
  );
}
