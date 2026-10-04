// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Camera, Music2, AtSign } from "lucide-react";
// import { useWaitlistCount } from "../../hooks/useWaitlistCount";
// import { VerifiedBadge } from "./SocialElements";
// import SplitText from "./SplitText";
// import MagneticWrapper from "./MagneticWrapper";
import { BrandSection } from '../BrandSection';
import { DynamicScrollBackground } from '../DynamicScrollBackground';
import { InteractiveGridBackground } from '../InteractiveGridBackground';

export default function Slide5FinalCTA({ active }: { active: boolean }) {
  // const navigate = useNavigate();
  // const { count } = useWaitlistCount();

  // const [confetti] = useState(() => {
  //   return [...Array(12)].map((_, i) => ({
  //     top: `${Math.random() * 100}%`,
  //     left: `${Math.random() * 100}%`,
  //     color: ["var(--cr-yellow)", "var(--cr-blush)", "var(--cr-orange)"][i % 3],
  //     duration: 5 + Math.random() * 5,
  //     isCircle: i % 2 === 0,
  //   }));
  // });

  return (
    <section
      className={`slide bg-pink-grad ${active ? 'active' : ''}`}
      style={{ overflowY: 'auto' }}
    >
      <DynamicScrollBackground />

      <InteractiveGridBackground />

      <BrandSection />
      {/* <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="animate-pop-bounce delay-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              padding: "10px 20px",
              borderRadius: "100px",
              color: "white",
              marginBottom: "32px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--cr-yellow)",
                boxShadow: "0 0 12px var(--cr-yellow)",
                animation: "pulse-soft 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {count && count > 0
                ? `${count.toLocaleString()} creators joined`
                : "Waitlist Open Now"}
            </span>
            <VerifiedBadge />
          </div>
        </div>

        <h2
          className="mobile-text-xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(60px, 12vw, 96px)",
            fontWeight: 700,
            color: "white",
            lineHeight: 0.9,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "40px",
          }}
        >
          <SplitText text="DON'T" active={active} delay={0.1} />
          <br />
          <SplitText text="MISS YOUR" active={active} delay={0.4} />
          <br />
          <SplitText text="SPOT." active={active} delay={0.7} />
        </h2>

        <p
          className="animate-slide-up delay-3 mobile-text-sm mobile-px-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "white",
            fontWeight: 800,
            marginBottom: "48px",
            maxWidth: "600px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.8,
          }}
        >
          CreatorsRewards is launching soon. Waitlist closes when we hit
          capacity.
        </p>

        <MagneticWrapper
          range={100}
          className="animate-pop-bounce delay-4"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            className="pulse-glow-button"
            onClick={() => navigate("/join")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.animation =
                "chromatic-shift 0.2s infinite linear, pulseGlow 2s ease-in-out infinite")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animation = active
                ? "pulseGlow 2s ease-in-out infinite"
                : "none")
            }
            style={{
              backgroundColor: "var(--cr-yellow)",
              color: "var(--cr-dark)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(18px, 3vw, 24px)",
              padding: "16px 36px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              boxShadow: "6px 6px 0px #1A1A1A",
              transition: "transform 0.15s, box-shadow 0.15s",
              textTransform: "uppercase",
              animation: active ? "pulseGlow 2s ease-in-out infinite" : "none",
              animationDelay: "1s",
            }}
          >
            Secure My Spot →
          </button>
        </MagneticWrapper>

        <div
          className="animate-slide-up delay-5 mobile-stack mobile-px-4"
          style={{
            marginTop: "64px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "20px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.01em",
            }}
          >
            CreatorsRewards
          </span>

          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              backgroundColor: "white",
              color: "var(--cr-pink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "14px",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.1)",
            }}
          >
            @
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { Icon: Camera, color: "#E1306C", link: "#" },
              { Icon: Music2, color: "#69C9D0", link: "#" },
              { Icon: AtSign, color: "#1DA1F2", link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="float-subtle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  color: social.color,
                  border: "2px solid white",
                  boxShadow: "4px 4px 0px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                  animationDelay: `${i * 0.2}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px) scale(1.1)";
                  e.currentTarget.style.boxShadow =
                    "6px 6px 0px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "4px 4px 0px rgba(0,0,0,0.1)";
                }}
              >
                <social.Icon size={18} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div> */}

      {/* Decorative Confetti Shapes (CSS only) */}
      {/* {confetti.map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              borderRadius: c.isCircle ? "50%" : "2px",
              backgroundColor: c.color,
              top: c.top,
              left: c.left,
              opacity: 0.6,
              animation: `spin ${c.duration}s linear infinite`,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        ))}
      </div> */}
    </section>
  );
}
