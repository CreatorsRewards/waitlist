import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Sparkles,
  ShoppingBag,
  Smartphone,
  Radio,
  Landmark,
  Compass,
} from 'lucide-react';
import { SpotlightCard } from './AnimatedComponents';
import { useScreenBreakpoints } from '../hooks/useMediaQuery';

// interface BrandSectionProps {
//   onStartCampaign: (category?: string) => void;
// }

export const BrandSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isLg } = useScreenBreakpoints();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax scroll transforms across desktop columns
  const yCol1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const categories = [
    {
      id: 'beauty',
      title: 'Beauty & Skincare',
      subtitle: 'UGC + micro influencers',
      icon: Sparkles,
      accentBg: 'bg-[#FFDDBF]',
      col: 0,
    },
    {
      id: 'fmcg',
      title: 'FMCG',
      subtitle: 'UGC at scale',
      icon: ShoppingBag,
      accentBg: 'bg-[#BAE6FD]',
      col: 1,
    },
    {
      id: 'startups',
      title: 'Startups & Apps',
      subtitle: 'Storytellers who explain',
      icon: Smartphone,
      accentBg: 'bg-[#D1FAE5]',
      col: 2,
    },
    {
      id: 'streamers',
      title: 'Streamers & Artists',
      subtitle: 'Clippers for reach',
      icon: Radio,
      accentBg: 'bg-[#FFDDBF]',
      col: 0,
    },
    {
      id: 'fintech',
      title: 'Fintech',
      subtitle: 'Trust-building creators',
      icon: Landmark,
      accentBg: 'bg-[#BAE6FD]',
      col: 1,
    },
    {
      id: 'travel',
      title: 'Travel & Lifestyle',
      subtitle: 'Nano influencers',
      icon: Compass,
      accentBg: 'bg-[#D1FAE5]',
      col: 2,
    },
  ];

  const getColTransform = (col: number) => {
    if (col === 0) return yCol1;
    if (col === 1) return yCol2;
    return yCol3;
  };

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="py-4 md:py-2 bg-transparent text-[#1C1917] relative overflow-hidden border-t border-[#1C1917]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with exact copy from PDF */}
        <div className="max-w-3xl mb-2 md:mb-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1C1917]/10 bg-[#BAE6FD] text-[#1C1917] text-xs font-bold uppercase tracking-wider mb-2"
          >
            For brands
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-[1.1] mb-2"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Every kind of brand,{' '}
            <span className="text-[#BAE6FD]">one place to find creators.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#1C1917]/85 leading-relaxed font-normal"
          >
            Even creators are brands here. A streamer or artist can bring on
            clippers to redistribute their own content and get people talking,
            the same way a skincare brand brings on UGC creators to talk about a
            new product.
          </motion.p>
        </div>

        {/* 6 Category Interactive Grid with Responsive Parallax (No numbers/tags) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                style={isLg ? { y: getColTransform(cat.col) } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <SpotlightCard
                  onClick={() => onStartCampaign(cat.title)}
                  className="group relative rounded-3xl bg-[#FAFAF9] border border-[#1C1917]/10 p-6 sm:p-7 shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-11 h-11 rounded-2xl ${cat.accentBg} border border-[#1C1917]/10 flex items-center justify-center shadow-xs text-[#1C1917]`}
                    >
                      <Icon className="w-5 h-5 text-[#1C1917]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1C1917]/60 group-hover:text-[#FB7185] bg-white px-2.5 py-1 rounded-full border border-[#1C1917]/10 transition-colors">
                      Start campaign →
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold text-[#1C1917] group-hover:text-[#FB7185] mb-2 tracking-tight transition-colors"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-[#1C1917]/75 text-sm font-normal">
                      {cat.subtitle}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
