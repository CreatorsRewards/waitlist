import React, { useEffect } from 'react';
import { SECTION_PALETTES } from '../constants/palettes';

export const DynamicScrollBackground: React.FC = () => {
  // const [activeSectionId, setActiveSectionId] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_PALETTES);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      let maxRatio = 0;
      // let mostVisibleId = '';

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          // mostVisibleId = entry.target.id;
        }
      });

      // if (mostVisibleId && SECTION_PALETTES[mostVisibleId]) {
      //   setActiveSectionId(mostVisibleId);
      // }
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
