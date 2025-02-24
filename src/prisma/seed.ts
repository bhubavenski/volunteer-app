import { PrismaClient } from '@prisma/client';
import {
  users,
  categories,
  initiatives,
  tasks,
} from '../constants/seed.constants';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('Seeding users...');
  const usersIds: string[] = [];

  for (const user of users) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: await bcrypt.hash(user.password, 10) },
    });
    usersIds.push(result.id);
  }

  console.log('Users seeded.');
  return usersIds;
}

async function seedCategories() {
  console.log('Seeding categories...');
  const categoriesIds: string[] = [];

  try {
    await Promise.all(
      categories.map(async (category) => {
        const result = await prisma.category.upsert({
          where: { name: category.name },
          update: {},
          create: category,
        });
        categoriesIds.push(result.id);
      })
    );
  } catch (error) {
    console.log('Error occured while seeding categories. Error:', error);
    return;
  }

  console.log('Categories seeded.');
  return categoriesIds;
}

async function seedInitiatives(categoriesIds: string[]) {
  console.log('Seeding initiatives...');
  const initiativesIds: string[] = [];

  try {
    await Promise.all(
      initiatives.map(async (initiative) => {
        const result = await prisma.initiative.create({
          data: {
            ...initiative,
            categories: {
              connect: categoriesIds.map((id) => ({ id })),
            },
          },
        });
        initiativesIds.push(result.id);
      })
    );
  } catch (error) {
    console.log('Error occured while seeding initiatives. Error:', error);
    return;
  }

  console.log('Initiatives seeded.');
  return initiativesIds;
}

async function seedTasks(userIds: string[], initiativeIds: string[]) {
  console.log('Seeding tasks...');
  const tasksIds: string[] = [];

  for(const initiativeId of initiativeIds) {
    try {
      await Promise.all(
        tasks.map(async (task) => {
          const randomIndex = Math.floor(Math.random() * userIds.length);
          const randomUserId = userIds[randomIndex];
  
          const result = await prisma.task.create({
            data: {
              ...task,
              assignedTo: randomUserId
                ? { connect: { id: randomUserId } }
                : undefined,
              initiative: { connect: { id: initiativeId } },
            },
          });
          tasksIds.push(result.id);
        })
      );
    } catch (error) {
      console.log('Error occured while seeding tasks. Error:', error);
      return;
    }
  }
  
  console.log('Tasks seeded.');
  return tasksIds;
}

async function main() {
  const usersIds = await seedUsers();
  const categoriesIds = await seedCategories();
  const initiativeIds = await seedInitiatives(categoriesIds!);
  await seedTasks(usersIds, initiativeIds!);
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
