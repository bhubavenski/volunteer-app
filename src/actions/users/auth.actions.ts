'use server';

import bcrypt from 'bcryptjs';
import { getErrorMessage, validateSchema } from '@/lib/utils';
import { SignUpValues, SignUpSchema } from '@/schemas/forms/SignUpFormSchema';
import { db } from '@/prisma/db';

export async function registerUser(body: SignUpValues) {
  const validatedFields = validateSchema(SignUpSchema, body);

  if ('error' in validatedFields) {
    return {
      error: validatedFields.error,
    };
  }

  const { email, password, username, role } = validatedFields.data;

  try {
    const existsUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existsUser) {
      return { error: 'This user already exists' };
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashedPass,
        username,
        role,
      },
    });
    return { success: 'Successfully created user' };
  } catch (error) {
    console.log(error);
    return { error: 'Error accured while creating user' };
  }
}

export const deleteUser = async (email:string) => {
  try {
    await db.user.delete({
      where: {
        email,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};
