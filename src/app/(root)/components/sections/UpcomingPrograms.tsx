import React from 'react';
import { ProgramCard } from '../program-card';

export default function UpcomingPrograms() {
  const programs = [
    {
      title: "Почистване на парк 'Витоша'",
      description:
        'Помогнете за опазването на природата в най-големия парк на София.',
      date: '15 Юни 2025',
      location: 'София, България',
      imageUrl: '/landing-page/volunteer-group-1.jpg',
    },
    {
      title: 'Помощ в дом за възрастни хора',
      description:
        'Прекарайте време с възрастни хора и им помогнете в ежедневните дейности.',
      date: '20 Юни 2025',
      location: 'Пловдив, България',
      imageUrl: '/landing-page/volunteer-group-2.jpg',
    },
    {
      title: 'Образователен семинар за деца',
      description:
        'Проведете интерактивен урок по наука за деца от местното училище.',
      date: '1 Юли 2025',
      location: 'Варна, България',
      imageUrl: '/landing-page/volunteer-group-3.jpg',
    },
  ];
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Предстоящи доброволчески програми
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
}
