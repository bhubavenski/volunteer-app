import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HandshakeIcon, UsersIcon, BriefcaseIcon, HeartIcon } from 'lucide-react';
import React from 'react';

const benefits = [
  {
    title: 'Acquiring new skills',
    icon: <BriefcaseIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Expanding your social network',
    icon: <UsersIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Improving your CV',
    icon: <HandshakeIcon className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Contributing to society',
    icon: <HeartIcon className="h-6 w-6 text-primary" />,
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 bg-muted/50">
      <Card className="border-none shadow-none">
        <CardHeader className="text-center text-3xl font-bold mb-12">
          Benefits of volunteering
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ title, icon }, index) => (
              <li
                key={index}
                className="relative rounded-2xl bg-white dark:bg-neutral-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-muted"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary/10 dark:bg-primary/30 p-3 rounded-full">
                    {icon}
                  </div>
                  <p className="font-semibold text-lg">{title}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
