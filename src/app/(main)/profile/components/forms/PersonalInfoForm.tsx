'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';

import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/app/(main)/components/Spinner';
import ErrorMessage from '@/app/auth/components/ErrorMessage';
import SuccessMessage from '@/app/auth/components/SuccessMessage';

export default function PersonalInfoForm() {
  const { data, status } = useSession();
  const [updateUserData, { isLoading: isUpdateUserDataLoading }] =
    useUpdateUserDataMutation();
  const userId = data?.user?.sub;
  console.log({ userId });

  const { data: userData, isLoading } = useGetUserDataQuery(userId!, {
    skip: !userId,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<PersonalInfoValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
      language: 'English',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(PersonalInfoSchema),
  });

  useEffect(() => {
    form.reset({
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
      bio: userData?.bio ?? '',
      language: 'English',
      username: userData?.username ?? '',
    });
  }, [userData, form]);

  if (status === 'loading' || isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div>Can not find your session</div>;
  }

  if (!userData) return <div>No user found</div>;

  const user = data.user;

  const onSubmit: SubmitHandler<PersonalInfoValues> = async (formValue) => {
    setSuccess(null);
    setError(null);

    try {
      await updateUserData({
        userId: data!.user.sub!,
        newUserData: formValue,
      }).unwrap();
      setSuccess('Successfully updated profile information');
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Manage your personal information and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name ?? 'unknown user'}
            />
            <AvatarFallback>
              {user.name ? user.name[0] : 'U'}
              {user.name ? user.name[1] : 'N'}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">Change avatar</Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-auto h-full">
              <Button
                type="submit"
                disabled={isUpdateUserDataLoading}
                className="gap-3 w-full"
              >
                {isUpdateUserDataLoading ? 'Updating...' : 'Update'}
              </Button>
              {success && <SuccessMessage message={success} className="mt-3" />}
              {error && <ErrorMessage message={error} className="mt-3" />}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
