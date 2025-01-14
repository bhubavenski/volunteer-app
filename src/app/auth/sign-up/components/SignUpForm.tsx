'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/utils';
import { SignUpValues, SignUpSchema } from '@/schemas/forms/SignUpFormSchema';
import { registerUser } from '@/actions/users/auth.actions';
import { AppLinks } from '@/constants/AppLinks';

type CustomSubmitHandler<T extends FieldValues> = (
  formData: T,
  setError: Dispatch<SetStateAction<string | null>>,
  setSuccess: Dispatch<SetStateAction<string | null>>
) => Promise<void>;

type SignUpFormProps = {
  onSubmit?: CustomSubmitHandler<SignUpValues>;
};

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const form = useForm<SignUpValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      username: '',
      role: 'user',
    },
    resolver: zodResolver(SignUpSchema),
  });
  const { isSubmitting } = form.formState;
  const router = useRouter();

  const defaultHandleSubmit: CustomSubmitHandler<SignUpValues> = async (
    formData
  ) => {
    setError(null);
    setSuccess(null);
    const { email, password, username } = formData;
    try {
      const user = await registerUser({
        email,
        password,
        username,
        role: 'user',
      });

      if (user && 'error' in user && user.error) {
        return setError(user.error);
      }

      const result = await signIn('credentials', {
        email,
        password,
        rememberMe,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result?.error);
      }

      setSuccess('Success created user');
      router.push('/');
    } catch (err) {
      console.log(err);
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  const handleSubmit: SubmitHandler<SignUpValues> = async (data) => {
    await (onSubmit
      ? onSubmit(data, setError, setSuccess)
      : defaultHandleSubmit(data, setError, setSuccess));
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign up
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign up method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit, (error) => {
              console.log(error);
            })}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel htmlFor="email" className="text-sm font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel htmlFor="username" className="text-sm font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="username"
                      placeholder="username..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel htmlFor="password" className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <SuccessMessage message={success} />
            <ErrorMessage message={error} />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={AppLinks.SIGN_IN}
            className="text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
