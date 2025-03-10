import { Prisma, PrismaClient } from '@prisma/client';
import {
  users,
  categories,
  initiatives,
  tasks,
} from '../constants/seed.constants';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUsers(tx: Prisma.TransactionClient) {
  console.log('Seeding users...');
  const usersIds: string[] = [];

  try {
    await Promise.all(
      users.map(async (user) => {
        const result = await tx.user.upsert({
          where: { email: user.email },
          update: {},
          create: { ...user, password: await bcrypt.hash(user.password, 10) },
        });
        usersIds.push(result.id);
      })
    );
  } catch (error) {
    console.log('Error occurred while seeding users. Error:', error);
    throw error;
  }

  console.log('Users seeded.');
  return usersIds;
}

async function seedCategories(tx: Prisma.TransactionClient) {
  console.log('Seeding categories...');
  const categoriesIds: string[] = [];

  try {
    await Promise.all(
      categories.map(async (category) => {
        const result = await tx.category.upsert({
          where: { name: category.name },
          update: {},
          create: category,
        });
        categoriesIds.push(result.id);
      })
    );
  } catch (error) {
    console.log('Error occured while seeding categories. Error:', error);
    throw error;
  }

  console.log('Categories seeded.');
  return categoriesIds;
}

async function seedInitiatives(
  tx: Prisma.TransactionClient,
  userIds: string[],
  categoriesIds: string[]
) {
  console.log('Seeding initiatives...');
  const initiativesIds: string[] = [];

  try {
    await Promise.all(
      initiatives.map(async (initiative) => {
        const randomIndex = Math.floor(Math.random() * userIds.length);
        const randomUserId = userIds[randomIndex];
        const result = await tx.initiative.create({
          data: {
            ...initiative,
            categories: {
              connect: categoriesIds.map((id) => ({ id })),
            },
            author: {
              connect: {
                id: randomUserId,
              },
            },
          },
        });
        initiativesIds.push(result.id);
      })
    );
  } catch (error) {
    console.log('Error occured while seeding initiatives. Error:', error);
    throw error;
  }

  console.log('Initiatives seeded.');
  return initiativesIds;
}

async function seedTasks(
  tx: Prisma.TransactionClient,
  userIds: string[],
  initiativeIds: string[]
) {
  console.log('Seeding tasks...');
  const tasksIds: string[] = [];

  for (const initiativeId of initiativeIds) {
    try {
      await Promise.all(
        tasks.map(async (task) => {
          const randomIndex = Math.floor(Math.random() * userIds.length);
          const randomUserId = userIds[randomIndex];

          const result = await tx.task.create({
            data: {
              ...task,
              assignedTo: { connect: { id: randomUserId } },
              initiative: { connect: { id: initiativeId } },
            },
          });
          tasksIds.push(result.id);
        })
      );
    } catch (error) {
      console.log('Error occured while seeding tasks. Error:', error);
      throw error;
    }
  }

  console.log('Tasks seeded.');
  return tasksIds;
}

async function main() {
  await prisma.$transaction(
    async (tx) => {
      const usersIds = await seedUsers(tx);
      const categoriesIds = await seedCategories(tx);
      const initiativeIds = await seedInitiatives(
        tx,
        usersIds!,
        categoriesIds!
      );
      await seedTasks(tx, usersIds!, initiativeIds!);
    },
    {
      timeout: 20000,
    }
  );

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    console.log('Seeding completed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
