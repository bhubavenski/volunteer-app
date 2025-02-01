import { Category, PrismaClient } from '@prisma/client';
import { users, categories, initiatives } from '../constants/seed.constants';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('Seeding users...');
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log('Users seeded.');
}

async function seedCategories() {
  console.log('Seeding categories...');

  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      })
    )
  );

  console.log('Categories seeded.');
  return prisma.category.findMany();
}

async function seedInitiatives(categories: Category[]) {
  console.log('Seeding initiatives...');
  for (const initiative of initiatives) {
    await prisma.initiative.create({
      data: {
        ...initiative,
        categories: {
          connect: categories.map((id) => id),
        },
      },
    });
  }
  console.log('Initiatives seeded.');
}

async function main() {
  await seedUsers();
  const categories = await seedCategories();
  await seedInitiatives(categories);
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
