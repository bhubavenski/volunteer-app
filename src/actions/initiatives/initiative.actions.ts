'use server';

import { prisma } from "@/lib/prisma";



export async function getInitiatives() {
  const data = await prisma.initiative.findMany();
  return data;
}
