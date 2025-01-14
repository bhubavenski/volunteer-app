import React from 'react';

export default function LocationCard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Локация</h2>
      <div className="aspect-video rounded-lg bg-muted">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          Карта на локацията
        </div>
      </div>
    </div>
  );
}
