'use server';

import { db } from '@/prisma/db';

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
