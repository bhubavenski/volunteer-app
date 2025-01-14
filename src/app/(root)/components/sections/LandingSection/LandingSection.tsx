import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';
import Link from 'next/link';
import { AppLinks } from '@/constants/AppLinks';

export default function LandingSection() {
  return (
    <section
      className={`${styles.landing_section_bg_img} " dark:text-black py-20 h-28}`}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Направи света по-добър с нас!
        </h2>
        <p className="text-xl mb-8">
          Открий вдъхновяващи доброволчески програми и се присъедини към нашата
          общност.
        </p>
        <Link href={AppLinks.INITIATIVES_LIST}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg"
          >
            Разгледай програмите
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
