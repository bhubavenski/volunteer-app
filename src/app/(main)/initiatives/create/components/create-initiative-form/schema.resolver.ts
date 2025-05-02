import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, {
    message: 'The title must be at least 5 characters long.',
  }),
  excerpt: z.string().min(5, {
    message: 'The excerpt must be at least 15 characters long.',
  }),
  description: z.string().min(20, {
    message: 'The description must be at least 20 characters long.',
  }),
  date: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate > today;
    },
    {
      message: 'The date must be in the future.',
    }
  ),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Please enter a valid time (HH:MM).',
  }),
  location: z.string().min(3, {
    message: 'The location must be at least 3 characters long.',
  }),
  mapEmbedUrl: z
    .string()
    .min(20, {
      message: 'The url must be at least 20 characters long.',
    })
    .url({
      message: 'Please provide a valid URL.',
    })
    .optional()
    .or(z.literal('')),
  categories: z
    .array(
      z.string().min(3, {
        message: 'The category must be at least 3 characters long.',
      })
    )
    .max(4, {
      message: 'The categories must not be longer than 4',
    })
    .refine((data) => data.length > 0, {
      message: 'At least one category is required.',
    }),
  // maxParticipants: z.number().min(1, {
  //   message: 'There must be at least 1 participant.',
  // }),
});
