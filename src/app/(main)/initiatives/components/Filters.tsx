'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { InitiativesPageSearchParams } from '../page';
import { useRouter } from 'next/navigation';
import { getUniqueLocations } from '@/actions/initiatives.actions';
// import { CategoriesInput } from '../create/components/CategoriesInput';
import { AppLinks } from '@/constants/AppLinks';

export default function Filters() {
  const router = useRouter();
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<InitiativesPageSearchParams>({
    location: '',
    categories: [],
  });

  const handleFilter = () => {
    console.log('handlefilter');
    const params = new URLSearchParams();

    if (filters.location && filters.location !== '/') {
      params.set('location', filters.location);
    }
    // if (filters.categories.length > 0)
    //   params.set('categories', filters.categories.join(','));

    router.push(`${AppLinks.INITIATIVES_LIST}?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      categories: [],
    });
  };

  useEffect(() => {
    async function getLocations() {
      const locations = await getUniqueLocations();
      setLocations(locations);
    }
    getLocations();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label htmlFor="location">Location</Label>
        <Select
          value={filters.location}
          onValueChange={(value) => setFilters({ ...filters, location: value })}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/">All</SelectItem>
            {locations.length ? (
              locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={'_'} value={'_'} disabled>
                Locations are loading
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      {/* <div>
        <Label htmlFor="category">Category</Label>
        <CategoriesInput
          categories={filters.categories}
          setCategories={(categories) =>
            setFilters((prev) => ({ ...prev, categories }))
          }
        />
      </div> */}
      <div className="flex items-end gap-2 mt-4">
        <Button onClick={handleFilter} className="flex-1">
          Filter
        </Button>
        <Button variant="outline" onClick={clearFilters} className="flex-1">
          Clear
        </Button>
      </div>
    </div>
  );
}
