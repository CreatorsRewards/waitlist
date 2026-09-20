import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  formatter,
  className = '',
}) => {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1
      );
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (to - from) * easedProgress);
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, from, to, duration]);

  const displayString = formatter ? formatter(value) : value.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayString}
      {suffix}
    </span>
  );
};

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  highlightClassName = 'text-[#FB7185]',
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isHighlight =
          highlightWords.includes(cleanWord) || highlightWords.includes(word);

        return (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 24, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + idx * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className={`inline-block ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export const TextRotator: React.FC<TextRotatorProps> = ({
  words,
  interval = 2800,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block relative overflow-hidden align-baseline ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-block whitespace-nowrap text-[#FB7185]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
  id?: string;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(251, 113, 133, 0.16)',
  onClick,
  id,
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -3;
      const tiltY = ((x - centerX) / centerX) * 3;
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform:
          isHovered && enableTilt
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.5s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      className={`relative overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl border-[#FB7185]/40' : ''
      } ${className}`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      {/* Interactive Border Edge Glow */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.85 : 0,
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(251, 113, 133, 0.45), transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />
      {children}
    </div>
  );
};

interface ClipPathRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  wrapperClassName?: string;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
  triggerOnScroll?: boolean;
}

export const ClipPathReveal: React.FC<ClipPathRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  className = '',
  wrapperClassName = '',
  as = 'div',
  triggerOnScroll = false,
}) => {
  const hiddenState = {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    y: '115%',
    opacity: 0,
  };

  const visibleState = {
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
    y: '0%',
    opacity: 1,
  };

  const transitionConfig = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  const Component = as === 'span' ? motion.span : motion.div;
  const WrapperTag = as === 'span' ? 'span' : 'div';

  return (
    <WrapperTag
      className={`overflow-hidden py-1 ${as === 'span' ? 'inline-block align-bottom' : 'block'} ${wrapperClassName}`}
    >
      <Component
        initial={hiddenState}
        {...(triggerOnScroll
          ? {
              whileInView: visibleState,
              viewport: { once: true, amount: 0.2 },
            }
          : {
              animate: visibleState,
            })}
        transition={transitionConfig}
        className={`${as === 'span' ? 'inline-block' : 'block'} ${className}`}
      >
        {children}
      </Component>
    </WrapperTag>
  );
};

interface ViewportRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  hoverScale?: boolean;
}

export const ViewportReveal: React.FC<ViewportRevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  scaleFrom = 0.95,
  yOffset = 24,
  className = '',
  once = true,
  amount = 0.15,
  hoverScale = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scaleFrom, y: yOffset }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={
        hoverScale ? { scale: 1.02, transition: { duration: 0.25 } } : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};
