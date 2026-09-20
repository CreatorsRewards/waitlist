import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Video, Scissors, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../AnimatedComponents';
import { useScreenBreakpoints } from '../../hooks/useMediaQuery';
import { DynamicScrollBackground } from '../DynamicScrollBackground';
import { InteractiveGridBackground } from '../InteractiveGridBackground';

// import SplitText from './SplitText';

export default function Slide2HowItWorks({ active }: { active: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMd } = useScreenBreakpoints();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax scroll transforms for the 3 grid columns on tablet/desktop
  const yCol0 = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const colTransforms = [yCol0, yCol1, yCol2];

  const creatorLanes = [
    {
      id: 'ugc',
      title: 'UGC Creator',
      ctaText: 'Join As Creator',
      text: 'Make original content for brands and get paid for what you deliver. No follower minimum, just good storytelling.',
      icon: Video,
      accentBg: 'bg-[#FFDDBF]',
      payoutTag: '₦35,000 – ₦180,000 / video',
      perk: 'Scripting & authentic product reviews',
    },
    {
      id: 'clipper',
      title: 'Clipper',
      ctaText: 'Join As Clipper',
      text: 'Turn video clipping into income. Cut and repost existing content, earn based on the views and engagement it pulls in, not time spent.',
      icon: Scissors,
      accentBg: 'bg-[#BAE6FD]',
      payoutTag: '₦0.25 – ₦0.55 / verified view',
      perk: 'Fast turnarounds & high volume scale',
    },
    {
      id: 'influencer',
      title: 'Micro & Nano Influencer',
      ctaText: 'Join as influencer',
      text: 'Small audience, real influence. Get matched with brands that want your voice, not your follower count.',
      icon: Sparkles,
      accentBg: 'bg-[#D1FAE5]',
      payoutTag: '₦50,000 – ₦350,000 / campaign',
      perk: 'Dedicated niche audience trust',
    },
  ];

  // const steps = [
  //   {
  //     num: '01',
  //     title: 'Apply',
  //     desc: 'Fill your profile. We verify you.',
  //   },
  //   {
  //     num: '02',
  //     title: 'Browse',
  //     desc: 'Pick deals that match your vibe.',
  //   },
  //   {
  //     num: '03',
  //     title: 'Get Paid',
  //     desc: 'Post content. Cash hits your account.',
  //   },
  // ];

  return (
    <section
      ref={sectionRef}
      className={`slide bg-pink-grad ${active ? 'active' : ''} py-24 md:py-32 relative overflow-hidden`}
    >
      <DynamicScrollBackground />

      <InteractiveGridBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-2 md:mb-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1C1917]/10 bg-[#BAE6FD] text-[#1C1917] text-xs font-bold uppercase tracking-wider mb-2"
          >
            For creators
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-[1.08] mb-2"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Whatever kind of creator you are,{' '}
            <span className="text-[#BAE6FD]">there's a lane for you.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-xl text-[#1C1917]/85 leading-relaxed font-normal"
          >
            UGC creator, clipper, micro or nano influencer; it doesn't matter
            how many followers you have. If you talk about the products you use,
            the places you go, the apps you rely on, or the shows you can't stop
            watching, you qualify.
          </motion.p>
        </div>

        {/* 3 Interactive Creator Cards in Off-White with Responsive Parallax (2-col on tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 items-stretch">
          {creatorLanes.map((lane, idx) => {
            const Icon = lane.icon;
            return (
              <motion.div
                key={lane.id}
                style={isMd ? { y: colTransforms[idx] } : {}}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <SpotlightCard
                  onClick={() => onJoinCreator(lane.title)}
                  className="group relative rounded-3xl bg-[#FAFAF9] border border-[#1C1917]/10 p-5 sm:p-7 md:p-8 lg:p-9 shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div>
                    {/* Header Strip with Clean Icon and Payout Tag (Collision-Safe) */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 sm:mb-6 lg:mb-8">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${lane.accentBg} border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] shadow-xs flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-[#1C1917]" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-[#1C1917] bg-[#D1FAE5] px-2.5 py-1 sm:px-3 rounded-full border border-emerald-300 whitespace-nowrap">
                        {lane.payoutTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1917] group-hover:text-[#FB7185] mb-3 sm:mb-4 tracking-tight transition-colors"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {lane.title}
                    </h3>

                    {/* Body Text */}
                    <p className="text-[#1C1917]/80 text-sm sm:text-base leading-relaxed font-normal mb-5 sm:mb-6">
                      {lane.text}
                    </p>

                    {/* Perk tag */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]/70 py-2 border-t border-[#1C1917]/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="truncate">{lane.perk}</span>
                    </div>
                  </div>

                  {/* Interactive Button CTA */}
                  <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-[#1C1917]/10 flex items-center justify-between gap-2">
                    <span className="font-bold text-sm sm:text-base text-[#1C1917] group-hover:text-[#FB7185] transition-colors">
                      {lane.ctaText}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1C1917] group-hover:text-[#FB7185] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* <h2 className="mobile-text-lg" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 6vw, 64px)',
        fontWeight: 700,
        color: 'white',
        lineHeight: 1.1,
        marginBottom: '32px',
        textTransform: 'uppercase',
        maxWidth: '800px'
      }}>
        <SplitText text="THREE STEPS TO YOUR FIRST DEAL" active={active} delay={0.3} />
      </h2> */}

      {/* <div className="mobile-px-4" style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        {steps.map((step, i) => (
          <div key={i} className={`animate-slide-up delay-${i + 3}`} style={{
            backgroundColor: 'white',
            padding: '16px 20px',
            borderRadius: '20px',
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.15)',
            border: '2px solid var(--cr-dark)'
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--cr-yellow)',
              color: 'var(--cr-dark)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '18px',
              flexShrink: 0
            }}>{step.num}</span>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--cr-pink)',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginBottom: '4px'
              }}>{step.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--cr-dark)',
                lineHeight: 1.3,
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                opacity: 0.6
              }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Watermark */}
      {/* <div
        className="float-subtle mobile-hide"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '300px',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'white',
          opacity: 0.05,
          zIndex: -1,
          pointerEvents: 'none',
          animationDuration: '6s',
        }}
      >
        ₦
      </div> */}
    </section>
  );
}
