'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import Tiptap from '@/components/TipTap';
import { sendImageToDiscord } from '@/lib/discord';
import UploadImage from './UploadImage';
import { CategoriesInput } from './CategoriesInput';
import { Prisma } from '@prisma/client';
import { createInitiative } from '@/actions/initiatives.actions';
import { createCategory } from '@/actions/categories.actions';
import { AppLinks } from '@/constants/AppLinks';

interface UploadedImage {
  id: string;
  url: string;
  type: string;
}

const formSchema = z.object({
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
  maxParticipants: z.number().min(1, {
    message: 'There must be at least 1 participant.',
  }),
});

export function CreateInitiativeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      description: '',
      date: '',
      time: '',
      location: '',
      mapEmbedUrl: '',
      categories: [],
      maxParticipants: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // images, categories and initiative must be in transactions
      const imagesUrls: string[] = await Promise.all(
        uploadedImages.map(async (image) => {
          const response = await fetch(image.url);
          const blob = await response.blob();

          const file = new File([blob], 'image.jpg', { type: image.type });

          return sendImageToDiscord({ imageFile: file });
        })
      );

      const initiativeTemplate: Prisma.InitiativeCreateInput = {
        title: values.title,
        description: values.description,
        excerpt: values.excerpt,
        location: values.location,
        actionDate: new Date(`${values.date}T${values.time}`),
        mapEmbedUrl: values.mapEmbedUrl,
        imagesUrls: imagesUrls,
      };

      const categoriesIds = await Promise.all(
        values.categories.map((category) =>
          createCategory({
            data: { name: category },
            select: {
              id: true,
            },
          })
        )
      );

      const initiative = await createInitiative({
        data: {
          ...initiativeTemplate,
          categories: {
            connect: categoriesIds.map((category) => ({
              id: category.id,
            })),
          },
        },
        select: {
          id: true,
        },
      });

      toast({
        title: 'The initiative was successfully created!',
        description: 'The new initiative has been added to the system.',
      });

      router.push(`${AppLinks.INITIATIVE}/${initiative.id}`);
    } catch (error: unknown) {
      console.log(getErrorMessage(error));
      toast({
        title: 'Error creating the initiative',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) =>
          console.log('err happened on submit -', err)
        )}
        className="space-y-8"
      >
        <UploadImage
          error={error}
          setError={setError}
          setUploadedImages={setUploadedImages}
          uploadedImages={uploadedImages}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Add title to initiative" {...field} />
              </FormControl>
              <FormDescription>
                Short and clear title of the initiative.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Input placeholder="Add excerpt to initiative" {...field} />
              </FormControl>
              <FormDescription>
                Short and clear excerpt of the initiative.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl className="size-[500px] flex flex-col justify-stretch gap-2">
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Detailed description of the goals and activities of the
                initiative.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location of the initiative"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mapEmbedUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Map</FormLabel>
              <FormControl>
                <Input placeholder="Enter url of the map" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <CategoriesInput
                  categories={field.value}
                  setCategories={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum number of participants</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create initiative'}
        </Button>
      </form>
    </Form>
  );
}
