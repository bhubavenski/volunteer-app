import Link from 'next/link';
import React, { HTMLAttributes, ReactNode } from 'react';

export default function HTTPErrorMessage({
  code,
  title,
  description,
  href,
  children,
  ...props
}: {
  code: string;
  title: string;
  description: string;
  href?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLScriptElement>) {
  return (
    <section
      className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"
      {...props}
    >
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">
          {code}
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          {title}
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {href ? <Link href={href}>{children}</Link> : <>{children}</>}
      </div>
    </section>
  );
}
