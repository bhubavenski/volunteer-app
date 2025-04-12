import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

export default function CarouselCard({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full relative rounded-lg overflow-hidden">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="pl-4">
            <div className="h-64 relative rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`Image ${index + 1} from the initiative`}
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
