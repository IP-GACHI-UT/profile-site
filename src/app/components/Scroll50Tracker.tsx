'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Scroll50Tracker() {
  useEffect(() => {
    let fired = false;

    const onScroll = () => {
      if (fired) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const rate = window.scrollY / docHeight;

      if (rate >= 0.5) {
        fired = true;
        window.gtag?.('event', 'scroll_50', {
          percent_scrolled: 50,
          page_path: window.location.pathname,
        });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
