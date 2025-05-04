import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

// lib/sanitize-html.ts
import sanitizeHtml from 'sanitize-html'

export function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br'],
    allowedAttributes: {
      a: ['href', 'target'],
    },
  })
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleString('bg-BG', {
    weekday: 'long', 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
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
  data: unknown
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

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
