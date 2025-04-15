'use server';

import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export const updateNames = async (
  id: string,
  firstName: string,
  lastName: string
) => {
  try {
    const data = await db.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error };
  }
};


type UserWithoutPassword = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    role: true;
    username: true;
    firstName: true;
    lastName: true;
    profileImg: true;
  };
}>;

export const getUsers = async (): Promise<
  | { success: true; data: UserWithoutPassword[] }
  | { success: false; error: unknown }
> => {
  try {
    const data = await db.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        username: true,
        firstName: true,
        lastName: true,
        profileImg: true,
      },
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, error };
  }
};
