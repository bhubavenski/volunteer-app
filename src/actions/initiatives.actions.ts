'use server';

import { InitiativesPageSearchParams } from '@/app/(main)/initiatives/page';
import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export async function getInitiatives(
  filters?: Partial<InitiativesPageSearchParams>
) {
  const initiatives = await db.initiative.findMany({
    where: {
      location: filters?.location,
      actionDate: filters?.actionDate,
      categories: {
        every: {
          name: { in: filters?.categories },
        },
      },
    },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
  return initiatives;
}

export async function getUniqueLocations() {
  const locations = await db.initiative.findMany({
    distinct: ['location'],
    select: {
      location: true,
    },
  });

  return locations.map((initiative) => initiative.location);
}

export async function createInitiative(
  initiative: Prisma.InitiativeCreateArgs
) {
  await db.initiative.create(initiative);
}
