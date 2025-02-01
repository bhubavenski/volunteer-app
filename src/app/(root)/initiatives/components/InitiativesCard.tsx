import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InitiativeWithCategory } from './types';

type InitiativeWithCategoryWithoutCategoryId = {
  category: Omit<InitiativeWithCategory['category'], 'id'>;
} & Omit<InitiativeWithCategory, 'category'>;

export default function InitiativeCard({
  initiative,
}: {
  initiative: InitiativeWithCategoryWithoutCategoryId;
}) {
  return (
    <Card key={initiative.id} className="flex flex-col">
      <CardHeader>
        <CardTitle>{initiative.title}</CardTitle>
        <CardDescription>{initiative.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {new Date(initiative.scheduledDate).toLocaleDateString('bg-BG')}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{initiative.location}</span>
        </div>
        <div className="mt-2 text-sm font-medium">
          {initiative.category.title}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/initiative/${initiative.id}`} className="w-full">
          <Button className="w-full">Детайли</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
