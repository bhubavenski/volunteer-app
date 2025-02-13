import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16">
      <Card>
        <CardHeader className="text-3xl font-bold mb-12">
          Benefits of volunteering
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Acquiring new skills',
              'Expanding your social network',
              'Improving your CV',
              'Contributing to society',
            ].map((benefit, index) => (
              <li key={index} className="bg-muted rounded-lg p-4 shadow">
                <p className="font-medium">{benefit}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
