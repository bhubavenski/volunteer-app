import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Users
  const users: Omit<User, 'id'>[] = [
    {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'securepassword123', // Винаги хеширайте пароли в реални проекти!
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
    },
    {
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      password: 'securepassword456',
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'user',
    },
  ];

  await Promise.all(users.map((user) => prisma.user.create({ data: user })));

  console.log('Users seeded.');

  // Seed Categories
  const categories: Prisma.CategoryCreateInput[] = [
    {
      title: 'Category1',
    },
    {
      title: 'Category2',
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) => prisma.category.create({ data: category }))
  );

  console.log('Categories seeded.');

  // Seed Initiatives
  const initiatives: Prisma.InitiativeCreateInput[] = [
    {
      title: 'Clean the Park',
      description: 'A community effort to clean the local park.',
      excerpt: 'Join us to clean the local park and make it a better place!',
      location: 'Central Park, New York',
      scheduledDate: new Date('2025-02-15T10:00:00Z'),
      category: {
        connect: { id: createdCategories[0].id },
      },
    },
    {
      title: 'Tree Planting',
      description: 'Help plant trees in our neighborhood.',
      excerpt: 'Let’s make our neighborhood greener by planting trees.',
      location: 'Main Street, Boston',
      scheduledDate: new Date('2025-03-10T14:00:00Z'),
      category: {
        connect: { id: createdCategories[1].id },
      },
    },
  ];

  await Promise.all(
    initiatives.map((initiative) =>
      prisma.initiative.create({ data: initiative })
    )
  );

  console.log('Initiatives seeded.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed successfully.');
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
