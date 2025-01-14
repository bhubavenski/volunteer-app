import React from 'react';

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Ползи от доброволчеството</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            'Придобиване на нови умения',
            'Разширяване на социалната мрежа',
            'Подобряване на CV-то',
            'Принос към обществото',
          ].map((benefit, index) => (
            <li key={index} className="bg-muted rounded-lg p-4 shadow">
              <p className="font-medium">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
