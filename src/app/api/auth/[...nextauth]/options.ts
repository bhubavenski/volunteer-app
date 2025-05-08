import { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User as PrismaUser, Role } from '@prisma/client';
import { SignInFormSchema } from '@/schemas/forms/SignInFormSchema';
import { db } from '@/prisma/db';
import { AppLinks } from '@/constants/AppLinks';

declare module 'next-auth' {
  interface User extends PrismaUser {
    id: string;
  } // Наследява всички полета от Prisma.User

  interface Session extends DefaultSession {
    user: User & { sub?: string }; // Добавя свойство sub към user
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
        if (!credentials) {
          throw new Error('No credentials were found');
        }

        const validatedFields = SignInFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('Credentials are not in valid format');
        }

        // const { email, password, rememberMe } = validatedFields.data;
        const { email, password } = validatedFields.data;

        let user: PrismaUser | null = null;

        try {
          user = await db.user.findUnique({
            where: { email },
          });
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

        // user.rememberMe = rememberMe;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;

        // token.rememberMe = user.rememberMe || false;
      }
      // if (token.rememberMe) {
      //   token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      // } else {
      //   token.exp = Math.floor(Date.now() / 1000) + 24 * 60;
      // }

      return token;
    },
    async session({ session, token }) {
      session.user.sub = token.sub;
      session.user.role = token.role as Role;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.username = token.username as string;

      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      baseUrl = getBaseUrl();
      return baseUrl;
    },
  },
  pages: {
    signIn: AppLinks.SIGN_IN,
  },
};

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }

  return `http://localhost:${process.env.PORT || 3000}`
}
