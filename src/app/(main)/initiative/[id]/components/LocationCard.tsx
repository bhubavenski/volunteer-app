import React from 'react';

export default function LocationCard({ embed }: { embed: string | null }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      {embed ? (
        <iframe
          src={embed}
          className="w-full h-full border-0 rounded-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <div>This organizations havent specified a location</div>
      )}
    </div>
  );
}
