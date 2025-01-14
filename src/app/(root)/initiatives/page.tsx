'use client';

import { useState } from 'react';
import Filters from './components/Filters';
import InitiativeCard from './components/InitiativesCard';
import { Initiative } from './components/types';

const initiatives: Initiative[] = [
  {
    id: '1',
    title: "Почистване на парк 'Витоша'",
    description:
      'Помогнете за опазването на природата в най-големия парк на София.',
    date: '2025-06-15',
    location: 'София',
    category: 'Екология',
  },
  {
    id: '2',
    title: 'Помощ в дом за възрастни хора',
    description:
      'Прекарайте време с възрастни хора и им помогнете в ежедневните дейности.',
    date: '2025-06-20',
    location: 'Пловдив',
    category: 'Социални дейности',
  },
  {
    id: '3',
    title: 'Образователен семинар за деца',
    description:
      'Проведете интерактивен урок по наука за деца от местното училище.',
    date: '2025-07-01',
    location: 'Варна',
    category: 'Образование',
  },
  {
    id: '4',
    title: 'Засаждане на дървета',
    description: 'Помогнете за залесяването на градски район.',
    date: '2025-07-10',
    location: 'Бургас',
    category: 'Екология',
  },
  {
    id: '5',
    title: 'Организиране на благотворителен базар',
    description:
      'Помогнете в организацията и провеждането на благотворителен базар.',
    date: '2025-07-15',
    location: 'София',
    category: 'Социални дейности',
  },
];

export default function InitiativesPage() {
  const [filteredInitiatives, setFilteredInitiatives] =
    useState<Initiative[]>(initiatives);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Инициативи</h1>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Filters initiatives={initiatives} setFilteredInitiatives={setFilteredInitiatives} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>
    </div>
  );
}
