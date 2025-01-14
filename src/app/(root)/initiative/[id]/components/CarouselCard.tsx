import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';
import { InitiativeProps } from '../page';

export default function CarouselCard({
  initiative,
}: {
  initiative: InitiativeProps;
}) {
  return (
    <Carousel className="w-full max-w-2xl mx-auto relative rounded-lg overflow-hidden">
      <CarouselContent>
        {initiative.images.map((src, index) => (
          <CarouselItem key={index} className="pl-4">
            <div className="h-64 relative rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`Снимка ${index + 1} от инициативата`}
                className="object-cover"
                style={{ borderRadius: 'inherit' }}
                fill
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
