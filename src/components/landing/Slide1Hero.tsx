import { VerifiedBadge } from './SocialElements';
import SplitText from './SplitText';

export default function Slide1Hero({ active }: { active: boolean }) {
  return (
    <section className={`slide ${active ? 'active' : ''}`}>
      <div
        className="animate-pop-bounce delay-1"
        style={{ marginBottom: '32px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid var(--cr-dark)',
            padding: '6px 16px',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '4px 4px 0px var(--cr-dark)',
          }}
        >
          {/* Scanning Effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '30%',
              height: '100%',
              background:
                'linear-gradient(90deg, transparent, rgba(251, 113, 133, 0.2), transparent)',
              animation: 'scan-horizontal 3s infinite linear',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: 'var(--cr-pink)',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--cr-pink)',
                animation: 'pulse-soft 1.5s infinite',
              }}
            />
            Live Status
          </div>

          <div
            style={{
              height: '12px',
              width: '1px',
              background: 'var(--cr-dark)',
              opacity: 0.2,
            }}
          />

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--cr-dark)',
              letterSpacing: '0.02em',
            }}
          >
            LAUNCHING SOON <VerifiedBadge />
          </span>

          <div
            style={{
              height: '12px',
              width: '1px',
              background: 'var(--cr-dark)',
              opacity: 0.2,
            }}
          />

          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            [V2.0.4]
          </span>
        </div>
      </div>

      <h1
        className="mobile-text-xl"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 12vw, 110px)',
          fontWeight: 700,
          color: 'var(--cr-pink)',
          lineHeight: 0.85,
          margin: '12px 0 24px',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: active ? 'chromatic-shift 4s infinite linear' : 'none',
        }}
      >
        <SplitText text="GET PAID." active={active} delay={0.2} />
        <SplitText text="STAY YOU." active={active} delay={0.5} />
      </h1>

      <div
        className="animate-slide-up delay-7"
        style={{
          marginTop: '12px',
          padding: '12px 24px',
          border: '3px solid var(--cr-pink)',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '8px 8px 0px var(--cr-pink)',
          transform: 'rotate(-1deg)',
        }}
      >
        <p
          className="mobile-text-lg"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 4vw, 36px)',
            fontWeight: 800,
            color: 'var(--cr-dark)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          NIGERIA'S #1 PLATFORM FOR CREATORS
        </p>
      </div>

      <p
        className="animate-slide-up delay-8 mobile-text-sm"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: 'var(--cr-dark)',
          maxWidth: '600px',
          margin: '40px auto 0',
          fontWeight: 700,
          lineHeight: 1.4,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 0.7,
        }}
      >
        Post content. Work with brands.
        <br />
        Get paid straight to your bank account.
      </p>

      {/* Liquid Background Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'var(--cr-pink)',
          filter: 'url(#liquid-filter)',
          opacity: 0.05,
          zIndex: -2,
          borderRadius: '50%',
          animation: 'drift 25s infinite alternate linear',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'var(--cr-orange)',
          filter: 'url(#liquid-filter)',
          opacity: 0.05,
          zIndex: -2,
          borderRadius: '50%',
          animation: 'drift 30s infinite alternate-reverse linear',
        }}
      />

      {/* Decorative SVG Elements */}
      <svg
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '100px',
          height: '100px',
          opacity: 0.1,
          zIndex: -1,
          animation: 'spin 20s linear infinite',
        }}
      >
        <path
          d="M50 0L61.2 38.8H100L68.8 61.2L80 100L50 77.6L20 100L31.2 61.2L0 38.8H38.8L50 0Z"
          fill="var(--cr-pink)"
        />
      </svg>
    </section>
  );
}
