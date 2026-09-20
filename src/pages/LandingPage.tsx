import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Slide1Hero from '../components/landing/Slide1Hero';
import Slide2HowItWorks from '../components/landing/Slide2HowItWorks';
import Slide5FinalCTA from '../components/landing/Slide5FinalCTA';
import DotNav from '../components/landing/DotNav';
import { DynamicScrollBackground } from '../components/DynamicScrollBackground';
import { InteractiveGridBackground } from '../components/InteractiveGridBackground';

import { ChevronDown } from 'lucide-react';
import Slide4Footer from '../components/landing/Slide4Footer';

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const nextSlide = () =>
    setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setActiveSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index: number) =>
    setActiveSlide(Math.max(0, Math.min(index, totalSlides - 1)));

  // Slides 2 and 3 (index 1 and 2) have pink backgrounds
  const isPinkBg = activeSlide === 1 || activeSlide === 2;

  const [techParticles] = useState(() => {
    return [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      driftDuration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return; // Debounce

      if (Math.abs(e.deltaY) > 10) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default to avoid pull-to-refresh or other browser behaviors
    if (e.cancelable) e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // threshold of 50px for a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <>
      <div
        className={`slideshow-container ${isPinkBg ? 'pink-bg' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={
          {
            '--scroll-progress': activeSlide / (totalSlides - 1),
          } as React.CSSProperties & { '--scroll-progress': number }
        }
      >
        <Navbar activeSlide={activeSlide} />

        {/* HUD Viewport Borders */}
        <div className="hud-border">
          <div
            className="corner-bracket corner-tl"
            style={{
              transform:
                activeSlide % 2 === 0
                  ? 'scale(1)'
                  : 'scale(1.2) translate(-2px, -2px)',
            }}
          />
          <div
            className="corner-bracket corner-tr"
            style={{
              transform:
                activeSlide % 2 === 0
                  ? 'scale(1)'
                  : 'scale(1.2) translate(2px, -2px)',
            }}
          />
          <div
            className="corner-bracket corner-bl"
            style={{
              transform:
                activeSlide % 2 === 0
                  ? 'scale(1)'
                  : 'scale(1.2) translate(-2px, 2px)',
            }}
          />
          <div
            className="corner-bracket corner-br"
            style={{
              transform:
                activeSlide % 2 === 0
                  ? 'scale(1)'
                  : 'scale(1.2) translate(2px, 2px)',
            }}
          />
        </div>

        {/* Bending Background Layer */}
        <div
          style={{
            position: 'fixed',
            inset: '-1rem',
            background: isPinkBg ? 'var(--cr-yellow)' : 'var(--cr-pink)',
            zIndex: -10,
            opacity: 0.1,
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            clipPath:
              activeSlide % 2 === 0
                ? 'ellipse(100% 100% at 50% 100%)'
                : 'ellipse(150% 100% at 50% 120%)',
            animation: 'bend-it 8s infinite ease-in-out',
          }}
        />

        <a
          href="/join"
          className="persistent-cta"
          style={{
            opacity: activeSlide === 2 || activeSlide === 3 ? 0 : 1,
            pointerEvents:
              activeSlide === 2 || activeSlide === 3 ? 'none' : 'all',
          }}
        >
          Join the Waitlist →
        </a>

        {activeSlide < totalSlides - 1 && (
          <div
            className="scroll-indicator"
            onClick={nextSlide}
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <div
              className="pulsing-arrow"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ChevronDown size={24} strokeWidth={3} />
              <ChevronDown
                size={24}
                strokeWidth={3}
                style={{ marginTop: '-12px' }}
              />
            </div>
          </div>
        )}

        <div
          className="slides-wrapper"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            height: '100%',
          }}
        >
          <DynamicScrollBackground />

          <InteractiveGridBackground />
          {/* Tech Particles */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: -5,
            }}
          >
            {techParticles.map((p, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '2px',
                  height: '2px',
                  background: isPinkBg ? 'white' : 'var(--cr-pink)',
                  left: p.left,
                  top: p.top,
                  opacity: 0.2,
                  animation: `drift ${p.driftDuration}s infinite alternate linear`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          <Slide1Hero active={activeSlide === 0} />
          <Slide2HowItWorks active={activeSlide === 1} />
          <Slide5FinalCTA active={activeSlide === 2} />
          <Slide4Footer active={activeSlide === 3} />
        </div>

        <DotNav active={activeSlide} total={totalSlides} onChange={goToSlide} />
      </div>
    </>
  );
}
