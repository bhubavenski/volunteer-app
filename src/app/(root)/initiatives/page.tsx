import { prisma } from '@/lib/prisma';
// import Filters from './components/Filters';
import InitiativeCard from './components/InitiativesCard';

export default async function InitiativesPage() {
  const initiatives = await prisma.initiative.findMany({
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Инициативи</h1>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          {/* <Filters initiatives={initiatives} /> */}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>
    </div>
  );
}
