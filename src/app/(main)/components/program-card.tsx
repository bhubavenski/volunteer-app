import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ProgramCardProps = Prisma.InitiativeGetPayload<{
  select: {
    id: true;
    actionDate: true;
    location: true;
    title: true;
    excerpt: true;
    categories: true;
    imagesUrls: true;
  };
}>;

export function ProgramCard({ initiative }: { initiative: ProgramCardProps }) {
  return (
    <Link href={`initiative/${initiative.id}`}>
      <Card className="overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={initiative.imagesUrls[0]}
            alt={initiative.title}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <CardTitle>{initiative.title}</CardTitle>
          <CardDescription>{initiative.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(initiative.actionDate)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
            <MapPinIcon className="h-4 w-4" />
            <span>{initiative.location}</span>
          </div>
          <div className="flex flex-wrap justify-between mt-3">
            {initiative.categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-[#A3A3A3] px-3 py-1 text-primary-foreground rounded-md text-xs"
              >
                {category.name}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign up</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
