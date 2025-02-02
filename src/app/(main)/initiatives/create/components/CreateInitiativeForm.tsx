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

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'The title must be at least 5 characters long.',
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
    }),
  category: z.string().min(3, {
    message: 'The category must be at least 3 characters long.',
  }),
  maxParticipants: z.number().min(1, {
    message: 'There must be at least 1 participant.',
  }),
});

export function CreateInitiativeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      mapEmbedUrl: '',
      category: '',
      maxParticipants: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      toast({
        title: 'The initiative was successfully created!',
        description: 'The new initiative has been added to the system.',
      });
      console.log(values);

      // add post query to server

      router.push('/admin/initiatives');
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category of the initiative"
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
