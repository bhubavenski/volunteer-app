'use server';

import { CreateTaskT } from '@/app/(main)/dashboard/[id]/components/Task/AddTaskDialog';
import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export const createTask = async (
  id: string,
  values: CreateTaskT,
  path?: string
) => {
  //TODO validate input
  try {
    console.log(values)
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
    console.log('created server')
    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log('Error in createTask:',error);
  }
};
