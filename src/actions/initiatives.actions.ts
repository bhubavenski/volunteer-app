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


export async function deteleInitiative(initiativeId: string) {
  return db.initiative.delete({
    where: {
      id: initiativeId,
    },
  });
}

export async function addUserToInitiative(
  initiativeId: string,
  userId: string
) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  console.log({ userId, initiativeId });
  return db.initiative.update({
    where: {
      id: initiativeId,
    },
    data: {
      participants: {
        connect: {
          id: userId, 
        },
      },
    },
  });
}

export async function createInitiative(
  initiative: Prisma.InitiativeCreateArgs
) {
  return db.initiative.create(initiative);
}
