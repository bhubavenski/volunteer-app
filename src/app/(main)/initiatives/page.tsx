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
      <div className="flex items-start gap-5">
        <div className="flex flex-col w-1/4 sticky top-24 p-4 rounded-lg">
          <h1 className="text-3xl font-bold mb-8">Initiatives</h1>
          <Filters />
        </div>
        <div className="flex-1">
          <InitiativesList filters={filters} />
        </div>
      </div>
    </div>
  );
}
