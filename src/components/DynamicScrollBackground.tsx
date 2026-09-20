import React, { useEffect, useState } from 'react';

// Palette mapping for each section of the landing page
export const SECTION_PALETTES: Record<
  string,
  { bgColor: string; accentColor: string; name: string }
> = {
  hero: {
    bgColor: '#D1FAE5', // Signature African Mint
    accentColor: '#FB7185',
    name: 'Overview',
  },
  'stats-ticker': {
    bgColor: '#E0F2FE', // Soft Airy Sky Blue
    accentColor: '#0284C7',
    name: 'Network Proof',
  },
  creators: {
    bgColor: '#FFEDD5', // Warm Peach
    accentColor: '#EA580C',
    name: 'Creator Lanes',
  },
  brands: {
    bgColor: '#E2F6EA', // Fresh Mint-Sage
    accentColor: '#059669',
    name: 'Brand Matrix',
  },
  'how-it-works': {
    bgColor: '#FFF1E8', // Warm Apricot Cream
    accentColor: '#F43F5E',
    name: 'How It Works',
  },
  'parallax-showcase': {
    bgColor: '#E0F2FE', // Electric Sky
    accentColor: '#0284C7',
    name: 'Live Showcase',
  },
  calculator: {
    bgColor: '#FFEDD5', // Warm Peach Glow
    accentColor: '#FB7185',
    name: 'ROI & Earnings Calculator',
  },
  'earnings-calculator': {
    bgColor: '#FFEDD5', // Warm Peach Glow
    accentColor: '#FB7185',
    name: 'ROI & Earnings Calculator',
  },
  'why-us': {
    bgColor: '#FFEBEB', // Subtle Warm Coral-Rose
    accentColor: '#E11D48',
    name: 'Why CreatorsRewards',
  },
  'campaign-preview': {
    bgColor: '#D1FAE5', // African Mint
    accentColor: '#FB7185',
    name: 'Launch Campaign',
  },
};

export const DynamicScrollBackground: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_PALETTES);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      let maxRatio = 0;
      let mostVisibleId = '';

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleId = entry.target.id;
        }
      });

      if (mostVisibleId && SECTION_PALETTES[mostVisibleId]) {
        setActiveSectionId(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -35% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // const currentPalette =
  //   SECTION_PALETTES[activeSectionId] || SECTION_PALETTES.hero;

  return (
    <div
      aria-hidden="true"
      className=" fixed inset-0 pointer-events-none -z-20 transition-colors duration-700 ease-out"
      // style={{ backgroundColor: currentPalette.bgColor }}
    />
  );
};
