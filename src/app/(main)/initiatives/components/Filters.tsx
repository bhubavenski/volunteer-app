'use client';

import { Input } from '@/components/ui/input';
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

export default function Filters() {
  const router = useRouter();
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<InitiativesPageSearchParams>({
    location: '',
    actionDate: '',
    categories: [],
  });

  const handleFilter = () => {
    console.log('handlefilter');
    const params = new URLSearchParams();

    if (filters.location && filters.location !== '/') {
      params.set('location', filters.location);
    }
    if (filters.actionDate) params.set('actionDate', filters.actionDate);
    if (filters.categories.length > 0)
      params.set('categories', filters.categories.join(','));

    router.push(`/initiatives?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      actionDate: '',
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
    <>
      <div>
        <Label htmlFor="location">Локация</Label>
        <Select
          value={filters.location}
          onValueChange={(value) => setFilters({ ...filters, location: value })}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Избери локация" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/">Всички</SelectItem>
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
      <div>
        <Label htmlFor="actionDate">Дата (от)</Label>
        <Input
          id="actionDate"
          type="date"
          value={filters.actionDate}
          onChange={(e) =>
            setFilters({ ...filters, actionDate: e.target.value })
          }
        />
      </div>
      <div>
        {/* <Label htmlFor="category">Категория</Label>
        <Select value={filters.categories} onValueChange={setCategoryFilter}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Избери категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex items-end gap-2">
        <Button onClick={handleFilter}>Филтрирай</Button>
        <Button variant="outline" onClick={clearFilters}>
          Изчисти
        </Button>
      </div>
    </>
  );
}
