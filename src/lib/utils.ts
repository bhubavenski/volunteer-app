import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  return message;
};

type ValidationResult<T> = { data: T } | { error: string };

export function validateSchema<T>(
  schema: z.Schema<T>,
  data: any
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errorMessages = result.error.errors
      .map((error) => error.message)
      .join(', ');
    return { error: errorMessages };
  }

  return { data: result.data };
}
