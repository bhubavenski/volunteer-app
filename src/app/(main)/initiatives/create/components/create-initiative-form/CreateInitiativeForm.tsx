'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
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
import UploadImage, { type UploadedImage } from '../UploadImage';
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
    let imgLinksArr: string[] = [];
    try {
      try {
        imgLinksArr = await uploadImagesToImgur(
          uploadedImages,
          process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID!
        );
        console.log('Uploaded links:', imgLinksArr);
      } catch (uploadError) {
        console.error('Error uploading images to Imgur:', uploadError);
        toast({
          title: 'Грешка при качване на изображения',
          description:
            'Неуспешно качване на едно или повече изображения, но създаването на инициативата продължава.',
          variant: 'destructive',
        });
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
        title: 'Инициативата беше създадена успешно!',
        description: 'Новата инициатива беше добавена в системата.',
      });

      router.push(`${AppLinks.INITIATIVE}/${initiative.id}`);
    } catch (error: unknown) {
      console.log(getErrorMessage(error));
      toast({
        title: 'Грешка при създаване на инициативата',
        description: 'Моля, опитайте отново по-късно.',
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
              <FormLabel>Заглавие</FormLabel>
              <FormControl>
                <Input
                  placeholder="Добави заглавие на инициативата"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Кратко и ясно заглавие на инициативата.
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
              <FormLabel>Резюме</FormLabel>
              <FormControl>
                <Input placeholder="Добави резюме на инициативата" {...field} />
              </FormControl>
              <FormDescription>
                Кратко и ясно резюме на инициативата.
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
              <FormLabel>Описание</FormLabel>
              <FormControl className="size-[500px] flex flex-col justify-stretch gap-2">
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Подробно описание на целите и дейностите на инициативата.
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
                <FormLabel>Дата</FormLabel>
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
                <FormLabel>Час</FormLabel>
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
              <FormLabel>Локация</FormLabel>
              <FormControl>
                <Input
                  placeholder="Въведи локация на инициативата"
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
              <FormLabel>Карта</FormLabel>
              <FormControl>
                <Input placeholder="Въведи URL адрес за картата" {...field} />
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
                  setCategories={(newCategories) => {
                    field.onChange(newCategories);
                  }}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormDescription>
                Добавете поне една категория (минимум 3 символа)
              </FormDescription>
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
