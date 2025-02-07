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
import { Initiative } from '@prisma/client';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';

export function ProgramCard({
  initiative,
}: {
  initiative: Omit<Initiative, 'id' | 'mapEmbedUrl' | 'description'>;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src="https://cdn.discordapp.com/attachments/1058067201472614445/1336965779840827463/volunteer-group-2.jpg?ex=67a5b9e9&is=67a46869&hm=994cda2afb64a6608b8c7fcd98b1d5227c0c259571bf2a61971b8688d5e328aa&"
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
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign up</Button>
      </CardFooter>
    </Card>
  );
}
