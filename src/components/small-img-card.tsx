import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppLinks } from '@/constants/AppLinks';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}
export function SmallProgramCard({
  id,
  title,
  description,
  date,
  location,
  imageUrl,
}: ProgramCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className='w-full h-48 relative'>
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover"
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`${AppLinks.INITIATIVE}/${id}`} className="w-full">
          <Button className="w-full">Запиши се</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
