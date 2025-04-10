'use server';

import { getErrorMessage } from '@/lib/utils';
import { db } from '@/prisma/db';
import { Prisma, Status, Task } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateTaskToBacklog = async (
  taskId: string,
) => {
  try {
    // Актуализиране на задачата в базата данни (преместване в беклог)
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        sprintId: null, // Премахване на спринта (задачата не е част от спринт)
      },
    });

    return { success: true, task: updatedTask };
  } catch (error) {
    console.error('Error moving task to backlog:', error);
    return { success: false, error: getErrorMessage(error) };
  }
};

export const updateTaskToSprint = async (
  taskId: string,
  newSprintId: string,
) => {
  try {
    // Намери задачата по id и актуализирай спринта и статуса
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        sprintId: newSprintId, // Преместване в новия спринт
      },
    });

    return { success: true, task: updatedTask };
  } catch (error) {
    console.error('Error moving task to sprint:', error);
    return { success: false, error: getErrorMessage(error) };
  }
};

export const updateTaskInSprintStages = async (
  taskId: string,
  status: Status
) => {
  try {
    // Актуализиране на задачата в базата данни
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        status
      }, // Актуализираме задачата с предоставените нови данни
    });

    // Връщане на успешен резултат с актуализираната задача
    return { success: true, task: updatedTask };
  } catch (error) {
    console.error('Error updating task in sprint:', error);
    // Връщане на грешка, ако се случи нещо при актуализирането
    return { success: false, error: getErrorMessage(error) };
  }
};

type CreateTaskResult =
  | { success: true; result: Task } // Когато е успешно, има `result`
  | { success: false; error: string }; // Когато има грешка, има `error`

export const createTask = async (
  id: string,
  values: Prisma.TaskCreateInput,
  path?: string
): Promise<CreateTaskResult> => {
  console.log('asddsaasdsdadsadsa=',values)
  try {
    const result = await db.task.create({
      data: {
        status: 'TODO',
        title: values.title,
        description: values.description,
        category: values.category,
        initiative: { connect: { id } },
        priority: values.priority
      },
    });
    if (path) revalidatePath(path);

    return { success: true, result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};

type GetTaskResult =
  | { success: true; result: Task[] } // Когато е успешно, има `result`
  | { success: false; error: string }; // Когато има грешка, има `error`

export const getTasks = async (
  q: Prisma.TaskFindManyArgs
): Promise<GetTaskResult> => {
  //TODO validate input
  try {
    const result = await db.task.findMany(q);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};
