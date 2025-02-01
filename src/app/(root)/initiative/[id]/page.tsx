import SignUpVolunteer from '@/app/(root)/initiative/[id]/components/SignUpVolunteer';
import LocationCard from '@/app/(root)/initiative/[id]/components/LocationCard';
import CalendarCard from '@/app/(root)/initiative/[id]/components/CalendarCard';
import DetailsCard from '@/app/(root)/initiative/[id]/components/DetailsCard';
import CarouselCard from '@/app/(root)/initiative/[id]/components/CarouselCard';
import { prisma } from '@/lib/prisma';

type InitiativePageProps = {
  searchParams: {
    id: string;
  };
};

export default async function InitiativePage({
  searchParams,
}: InitiativePageProps) {
  // const initiative = {
  //   id: '1',
  //   title: "Почистване на парк 'Витоша'",
  //   description: `
  //     🌿 Ежегодно почистване на парк „Витоша“ 🌿
  //     Станете част от нашата мисия за съхраняване на природата! Присъединете се към нас в ежегодното почистване на парк „Витоша“, където заедно ще се погрижим за красотата и чистотата на тази уникална природна перла.
  //     🌟 Какво ще направим?
  //     Събиране на отпадъци по основните и второстепенните пътеки
  //     Обновяване и поддръжка на туристическите маршрути
  //     Пряко участие в опазването на екосистемата на Витоша
  //     📅 Детайли за инициативата:

  //     Дата: Неделя, 15 юни 2025 г.
  //     Час: 09:00 – 14:00
  //     Място: Парк „Витоша“, София, България
  //     Брой участници: 50 души
  //     🎒 Какво да носите?

  //     Удобни обувки и дрехи, подходящи за работа на открито
  //     Ръкавици и шапка за слънце
  //     Бутилка вода и лека закуска
  //     🙏 Защо да се включите?
  //     С вашата помощ можем да запазим парка чист и приветлив за всички посетители. Малките усилия днес са голяма крачка към устойчиво бъдеще!

  //     🔗 Как да се запишете?
  //     Посетете нашия уебсайт или се свържете с нас на [въведете контакт].

  //     Нека заедно направим промяна! 🌍✨
  //     Очакваме ви с много енергия, усмивки и желание за една по-чиста природа!
  //     `,
  //   date: new Date(2025, 5, 15), // 15 Юни 2025
  //   time: '09:00 - 14:00',
  //   location: "Парк 'Витоша', София, България",
  //   participants: 50,
  //   images: [
  //     '/landing-page/volunteer-group-1.jpg',
  //     '/landing-page/volunteer-group-2.jpg',
  //     '/landing-page/volunteer-group-3.jpg',
  //   ],
  // };
  const initiative = await prisma.initiative.findFirst({
    where: {
      id: searchParams.id,
    },
  });

  if(!initiative) {
    return <div>Not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{initiative.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CarouselCard initiative={initiative} />

        <DetailsCard initiative={initiative} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Описание</h2>
        <p className="text-muted-foreground">{initiative.description}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <CalendarCard initiative={initiative} />

        <LocationCard />

        <SignUpVolunteer initiative={initiative} />
      </div>
    </div>
  );
}
