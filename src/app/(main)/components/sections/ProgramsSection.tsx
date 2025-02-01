import { Globe, Heart, Users } from 'lucide-react';
import React from 'react';

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Нашите програми
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Грижа за природата', icon: Globe },
            { title: 'Помощ за възрастни хора', icon: Heart },
            { title: 'Образователни инициативи', icon: Users },
          ].map((program, index) => (
            <div
              key={index}
              className="text-card-foreground rounded-lg p-6 shadow-md"
            >
              <program.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p className="text-muted-foreground">
                Присъедини се към нашата програма и направи реална промяна в
                обществото.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
