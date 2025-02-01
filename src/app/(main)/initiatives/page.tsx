import Filters from './components/Filters';
import { Prisma } from '@prisma/client';
import InitiativesList from './components/InitiativesList';

export type InitiativeWithCategories = Prisma.InitiativeGetPayload<{
  include: {
    categories: {
      select: { name: true };
    };
  };
}>;

export type InitiativesPageSearchParams = {
  location: string;
  actionDate: string;
  categories: string[];
};

export default async function InitiativesPage({
  searchParams,
}: {
  searchParams: Promise<InitiativesPageSearchParams>;
}) {
  const filters = await searchParams;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Инициативи</h1>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Filters />
        </div>
        <InitiativesList filters={filters} />
      </div>
    </div>
  );
}
