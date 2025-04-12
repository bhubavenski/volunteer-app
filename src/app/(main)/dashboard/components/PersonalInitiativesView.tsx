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
    <Card className="">
      <CardHeader>
        <CardTitle>{initiative.title}</CardTitle>
        <CardDescription>{initiative.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>Action date: {formatDate(initiative.startDate)}</p>
      </CardFooter>
    </Card>
  );
}
