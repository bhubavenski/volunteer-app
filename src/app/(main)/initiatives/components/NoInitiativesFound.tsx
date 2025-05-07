'use client';

import type { FC } from 'react';
import { Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoInitiativesFoundProps {
  onReset?: () => void;
}

const NoInitiativesFound: FC<NoInitiativesFoundProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center col-span-full justify-self-center">
      <div className="relative w-64 h-64 mb-6">
        <div className="absolute inset-0 animate-float flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Фонов кръг */}
            <div className="absolute inset-0 bg-gray-50 rounded-full opacity-70"></div>

            {/* Празна папка */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-32">
                {/* Задна част на папката */}
                <div className="absolute bottom-0 w-full h-24 bg-amber-100 rounded-md shadow-inner"></div>

                {/* Горна част на папката */}
                <div className="absolute top-0 w-16 h-8 bg-amber-200 rounded-t-md left-1/2 -translate-x-1/2"></div>

                {/* Вътрешност на папката */}
                <div className="absolute bottom-2 w-[95%] h-20 bg-amber-50 rounded-b-sm left-1/2 -translate-x-1/2"></div>

                {/* Предна част на папката - отворена */}
                <div className="absolute bottom-0 w-full h-16 bg-amber-200 rounded-md origin-bottom transform rotate-[-25deg] translate-y-2 translate-x-4 shadow-md"></div>

                {/* Лице на папката */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber-50 flex flex-col items-center justify-center">
                  <div className="w-8 h-1 bg-amber-200 rounded-full mb-2"></div>
                  <div className="w-8 h-1 bg-amber-200 rounded-full"></div>
                  <div className="w-8 h-1 bg-amber-200 rounded-full mt-2"></div>
                </div>
              </div>
            </div>

            {/* Анимирани елементи */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-gray-200 animate-ping-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-gray-200 animate-ping-slow delay-300"></div>
            <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full bg-gray-200 animate-ping-slow delay-600"></div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-4 animate-pulse">
          <Search className="h-8 w-8 text-gray-400" />
        </div>

        <div className="absolute top-6 right-6 opacity-50 animate-spin-slow">
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-2 animate-fade-in">
        No Initiatives found
      </h3>

      <p className="text-muted-foreground max-w-md animate-fade-in-delay">
        We couldn&apos;t find any volunteer programs matching your criteria. Try
        adjusting your filters or check back later.
      </p>

      {onReset && (
        <Button
          onClick={onReset}
          variant="outline"
          className="mt-6 animate-fade-in-delay-long"
        >
          Reset filters
        </Button>
      )}

      <div className="mt-8 w-64 h-1 bg-gray-100 rounded-full overflow-hidden animate-fade-in-delay">
        <div className="h-full bg-gray-300 animate-progress"></div>
      </div>
    </div>
  );
};

export default NoInitiativesFound;
