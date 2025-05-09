'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

const debounce = (fn: (...args: any) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const BackToTop = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const button = buttonRef.current;

    const scrollEventHandler = () => {
      if (!button) return;

      if (window.scrollY > window.innerHeight) {
        if (button.classList.contains('opacity-0')) {
          button.classList.remove('opacity-0');
        }
      } else {
        if (!button.classList.contains('opacity-0')) {
          button.classList.add('opacity-0');
        }
      }
    };

    // Check scroll position immediately when component is rendered
    scrollEventHandler();

    const debouncedScrollHandler = debounce(scrollEventHandler, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isMobile ? (
        // Mobile circular button
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="fixed bottom-7 right-4 bg-purple-600 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ease-out text-white opacity-0 hover:bg-gradient-to-r from-purple-600 to-blue-600"
          aria-label="Back to top"
        >
          <ChevronUp width={24} height={24} />
        </button>
      ) : (
        // Desktop button with text
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="fixed bottom-7 right-4 bg-purple-600 min-w-[52px] max-w-[52px] hover:max-w-[200px] flex items-center justify-end p-3 group hover:bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg transition-all duration-500 ease-out text-white gap-3 overflow-hidden opacity-0"
        >
          <span className="shrink-0 group-hover:opacity-100 text-xl">
            Back To Top
          </span>
          <ChevronUp width={28} height={28} className="shrink-0" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
