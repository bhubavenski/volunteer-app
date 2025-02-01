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
import { Badge } from '@/components/ui/badge';
import { InitiativeWithCategories } from '../../page';

export default function InitiativeCard({
  initiative,
}: {
  initiative: InitiativeWithCategories;
}) {
  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle>{initiative.title}</CardTitle>
        <CardDescription>{initiative.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {new Date(initiative.actionDate).toLocaleDateString('bg-BG')}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{initiative.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-10">
          {initiative.categories.map((category) => (
            <Badge
              variant="secondary"
              key={category.name}
              className="mr-1 px-2 py-1"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/initiative/${initiative.id}`} className="w-full">
          <Button className="w-full text-xl">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
