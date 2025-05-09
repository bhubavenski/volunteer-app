'use client';

import InitiativeCard from './initiative-card/InitiativesCard';
import { InitiativesPageSearchParams, InitiativeWithCategories } from '../page';
import { useEffect, useMemo, useState } from 'react';
import { getInitiatives } from '@/actions/initiatives.actions';
import NoInitiativesFound from './NoInitiativesFound';



export default function InitiativesList({
  filters,
}: {
  filters: InitiativesPageSearchParams;
}) {
  const [initiatives, setInitiatives] = useState<InitiativeWithCategories[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const stableFilters = useMemo(() => filters, [filters]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const data = await getInitiatives({
        where: {
          location: stableFilters.location,
        },
        include: {
          categories: {
            select: {
              name: true,
            },
          },
        },
      });

      setIsLoading(false);
      setInitiatives(data);
    }
    loadData();
  }, [stableFilters]);

  return isLoading ? (
    <div className="flex items-center justify-center">
      <span className="loader" />
    </div>
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {initiatives.length > 0 ? (
        initiatives.map((initiative) => (
          <InitiativeCard
            key={initiative.id}
            initiative={initiative}
            className="shadow-md"
          />
        ))
      ) : (
        <NoInitiativesFound/>
      )}
    </div>
  );
}
