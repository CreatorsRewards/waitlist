import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches with SSR/hydration safety
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Initial check
    setMatches(media.matches);

    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Convenient breakpoints aligned with Tailwind CSS:
 * - isMd: min-width 768px (Tablets & up)
 * - isLg: min-width 1024px (Desktops & up)
 * - isXl: min-width 1280px (Large displays)
 */
export function useScreenBreakpoints() {
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');

  return { isMd, isLg, isXl };
}
