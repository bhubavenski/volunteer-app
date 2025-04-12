'use server';
import { db } from '@/prisma/db';
import { Prisma } from '@prisma/client';

export async function createCategory(q: Prisma.CategoryCreateArgs) {
  return db.category.create(q);
}

export async function createCategories(q: Prisma.CategoryCreateManyArgs) {
  return db.category.createMany(q);
}
