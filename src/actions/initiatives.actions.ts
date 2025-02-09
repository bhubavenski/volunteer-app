'use server';

import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export async function getInitiatives<T extends Prisma.InitiativeFindManyArgs>(
  q: Prisma.SelectSubset<T, Prisma.InitiativeFindManyArgs>
): Promise<Prisma.InitiativeGetPayload<T>[]> {
  return db.initiative.findMany(q);
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
  return db.initiative.create(initiative);
}
