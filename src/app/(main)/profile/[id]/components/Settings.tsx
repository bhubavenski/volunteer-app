'use client';

import { HelpCircle, Trash2, LogOut } from 'lucide-react';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/actions/users/auth.actions';
import { Toast, useToastContext } from '@/contexts/ToastContext';
import { Role } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateNamesFormSchema,
  UpdateNamesFormSchemaValues,
} from '@/schemas/forms/UpdateNamesFormSchema';
import { updateNames } from '@/actions/users/user.actions';
import { useParams } from 'next/navigation';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';

type ProfileAdditionalOptionsProps = {
  onDelete?: (toast: Toast) => Promise<Toast>;
  role: Role;
};

export default function Settings({
  onDelete,
  role,
}: ProfileAdditionalOptionsProps) {
  const toast = useToastContext();
  const { id } = useParams<{ id: string }>();
  const { data } = useSession();

  const defaultHandleDelete = async () => {
    const result = await deleteUser(data!.user.email!);
    if (result?.error) {
      return toast({
        variant: 'destructive',
        title: 'Cannot delete profile',
        description: result.error,
      });
    }
    await signOut();
  };

  const handleSubmit = async (formValues: UpdateNamesFormSchemaValues) => {
    const res = await updateNames(
      id!,
      formValues.firstName,
      formValues.lastName
    );
    if (res.success !== true) {
      toast({
        title: 'Грешка при update',
        description: 'Възникна проблем при update на user',
        variant: 'destructive',
      });
    }
    toast({
      title: 'User updated successfully',
    });
  };

  const handleDelete = onDelete || defaultHandleDelete;

  const form = useForm<UpdateNamesFormSchemaValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(UpdateNamesFormSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="firstname" {...field} />
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
                    <Input placeholder="lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div>
          role: <span className="bold">{role}</span>
        </div>
        <Button variant="outline" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          <div className=" flex gap-2">
            <span>Help Center</span>
            <span className="text-muted-foreground font-light">
              Not implemented feature
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-destructive/15 hover:text-destructive"
          onClick={() => handleDelete(toast)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
