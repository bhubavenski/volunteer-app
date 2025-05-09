import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { League_Spartan, Roboto, Lexend } from 'next/font/google';
import Footer from './(main)/components/Footer';
import Header from './(main)/components/header/Header';
import { Toaster } from '@/components/ui/toaster';
import BackToTop from '@/components/BackToTop';
import { AuthProvider } from '@/contexts/AuthProvider';
import NextTopLoader from 'nextjs-toploader';
import { ToastContextProvider } from '@/contexts/ToastContext';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const spartan = League_Spartan({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-spartan',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${roboto.className} ${spartan.variable} ${lexend.className}`}
        >
          <NextTopLoader />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <ToastContextProvider>
                <div className="flex relative flex-col min-h-screen font-lexend isolate card-bg">
                  <Header />
                  <main className="flex-grow px-6 isolate relative">{children}</main>
                  <Footer />
                </div>
              </ToastContextProvider>
              <BackToTop />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
