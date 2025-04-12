import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import React from 'react';
import { InitiativeData } from './types';

export default function DasboardHeader({
  initiativeData,
}: {
  initiativeData: InitiativeData;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {initiativeData.title}
      </h1>
      <div className="flex items-center space-x-2 mt-1">
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 hover:bg-green-100"
        >
          {initiativeData.categories[0].name}
        </Badge>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          Активна
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" />
          {initiativeData.location}
        </div>
      </div>
    </div>
  );
}
