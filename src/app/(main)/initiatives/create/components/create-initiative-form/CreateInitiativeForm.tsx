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
import { CategoriesInput } from '../CategoriesInput';
import { createInitiative } from '@/actions/initiatives.actions';
import { createCategory } from '@/actions/categories.actions';
import { AppLinks } from '@/constants/AppLinks';
import { useSession } from 'next-auth/react';
import { formSchema } from './schema.resolver';
import UploadImage, { UploadedImage } from '../UploadImage';
import { uploadImagesToImgur } from '@/actions/upload';

export function CreateInitiativeForm() {
  const router = useRouter();
  const { data } = useSession();
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
    },
  });

  if (!data) {
    return <>You cant see this page</>;
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    let imgLinksArr:string[] = [];
    try {
      try {
        imgLinksArr = await uploadImagesToImgur(
          uploadedImages,
          process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID!
        );
        console.log('Uploaded links:', imgLinksArr);
      } catch (uploadError) {
        console.error("Error uploading images to Imgur:", uploadError)
        toast({
          title: "Error uploading images",
          description: "Failed to upload one or more images, but continuing with initiative creation.",
          variant: "destructive",
        })
      }

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
          title: values.title,
          description: values.description,
          excerpt: values.excerpt,
          location: values.location,
          startDate: new Date(`${values.date}T${values.time}`),
          mapEmbedUrl: values.mapEmbedUrl,
          categories: {
            connect: categoriesIds.map((category) => ({
              id: category.id,
            })),
          },
          imagesUrls: imgLinksArr,
          author: {
            connect: { id: data!.user.sub },
          },
          endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create initiative'}
        </Button>
      </form>
    </Form>
  );
}
