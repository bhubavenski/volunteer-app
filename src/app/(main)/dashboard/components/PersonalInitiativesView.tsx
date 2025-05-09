import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Initiative } from '@prisma/client';
import { formatDate } from '@/lib/utils';

export default function PersonalInitiativesView({
  initiative,
}: {
  initiative: Initiative;
}) {
  return (
     <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg sm:text-xl break-words line-clamp-2 hyphens-auto">
          {initiative.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 break-words hyphens-auto">
          {initiative.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-muted-foreground truncate">
          Action date: {formatDate(initiative.startDate)}
        </p>
      </CardFooter>
    </Card>
  );
}
