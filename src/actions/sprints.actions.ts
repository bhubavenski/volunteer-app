'use server';

import { getErrorMessage } from '@/lib/utils';
import { db } from '@/prisma/db';
import { Prisma, Sprint } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export type CreateSprintResult = (
  initiativeId: string,
  values: {
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
  },
  path?: string
) => Promise<
  | { success: true; result: Sprint } // Когато е успешно, има `result`
  | { success: false; error: string }
>; // Когато има грешка, има `error`

export const createSprint: CreateSprintResult = async (
  initiativeId,
  values,
  path
) => {
  try {
    const result = await db.sprint.create({
      data: {
        ...values,
        initiativeId,
      },
    });
    if (path) revalidatePath(path);

    return { success: true, result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};

type GetSprintResult =
  | { success: true; result: Sprint[] } // Когато е успешно, има `result`
  | { success: false; error: string }; // Когато има грешка, има `error`

export const getSprints = async (
  q: Prisma.SprintFindManyArgs
): Promise<GetSprintResult> => {
  //TODO validate input
  try {
    const result = await db.sprint.findMany(q);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};
