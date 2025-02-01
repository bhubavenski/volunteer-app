'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { InitiativeWithCategory } from './types';

export default function Filters({
  initiatives,
  setFilteredInitiatives,
}: {
  initiatives: InitiativeWithCategory[];
  setFilteredInitiatives: Dispatch<SetStateAction<InitiativeWithCategory[]>>;
}) {
  const [locationFilter, setLocationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleFilter = () => {
    const filtered = initiatives.filter((initiative) => {
      return (
        (locationFilter === 'all' || initiative.location === locationFilter) &&
        (dateFilter === '' || initiative.createdAt.toISOString() >= dateFilter) &&
        (categoryFilter === 'all' || initiative.category === categoryFilter)
      );
    });
    setFilteredInitiatives(filtered);
  };

  const clearFilters = () => {
    setLocationFilter('all');
    setDateFilter('');
    setCategoryFilter('all');
    setFilteredInitiatives(initiatives);
  };

  return (
    <>
      <div>
        <Label htmlFor="location">Локация</Label>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger id="location">
            <SelectValue placeholder="Избери локация" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Дата (от)</Label>
        <Input
          id="date"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="category">Категория</Label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
        </Select>
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
