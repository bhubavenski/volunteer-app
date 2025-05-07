import { PrismaClient } from '@prisma/client';

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  prisma = globalThis.prismaGlobal ?? new PrismaClient();
  globalThis.prismaGlobal = prisma;
}

export const db = prisma;
