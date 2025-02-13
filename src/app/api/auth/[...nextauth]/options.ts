import { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User as PrismaUser, Role } from '@prisma/client';
import { SignInFormSchema } from '@/schemas/forms/SignInFormSchema';
import { db } from '@/prisma/db';
import { AppLinks } from '@/constants/AppLinks';

declare module 'next-auth' {
  interface User extends PrismaUser {
    rememberMe: boolean;
  }

  interface Session extends DefaultSession {
    user: User & { sub?: string };
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        console.log('authorize ran');
        if (!credentials) {
          throw new Error('No credentials were found');
        }

        const validatedFields = SignInFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('Credentials are not in valid format');
        }

        const { email, password, rememberMe } = validatedFields.data;
        let user = null;

        try {
          user = (await db.user.findUnique({
            where: { email },
          })) as PrismaUser & { rememberMe: boolean };
        } catch {
          throw new Error('Error occured while searching for a user');
        }

        if (!user) {
          throw new Error("This user doesn't exists");
        }

        const isTheSamePass = await bcrypt.compare(password, user.password);

        if (!isTheSamePass) {
          throw new Error('Wrong credentials');
        }

        user.rememberMe = rememberMe;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt ran');

      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.rememberMe = user.rememberMe || false;
      }

      if (token.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      } else {
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60;
      }

      console.log(user, token);
      return token;
    },
    async session({ session, token }) {
      console.log('session ran');

      session.user.sub = token.sub;
      session.user.role = token.role as Role;

      return session;
    },
  },
  pages: {
    signIn: AppLinks.SIGN_IN,
  },
};
