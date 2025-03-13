'use server';

import { CreateTaskT } from '@/app/(main)/dashboard/[id]/analytics/components/Task/AddTaskDialog';
import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createTask = async (
  id: string,
  values: CreateTaskT,
  path?: string
) => {
  //TODO validate input
  try {
    console.log(values);
    await db.task.create({
      data: {
        status: 'TODO',
        title: values.title,
        description: values.description,
        initiative: {
          connect: {
            id: id,
          },
        },
      },
    });
    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log('Error in createTask:', error);
  }
};

export const getTasks = async (q: Prisma.TaskFindManyArgs) => {
  //TODO validate input
  try {
    return await db.task.findMany(q);
  } catch (error) {
    console.log('Error in getTasks:', error);
  }
};
