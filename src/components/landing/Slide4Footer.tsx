import Footer from '../Footer';
// import SplitText from "./SplitText";
import { EarningsCalculator } from '../EarningsCalculator';

export default function Slide4Footer({ active }: { active: boolean }) {
  return (
    <section
      className={`slide ${active ? 'active' : ''}`}
      style={{
        backgroundColor: 'var(--cr-yellow)',
        //  backgroundColor: "var(--cr-dark)",
        overflowY: 'auto',
      }}
    >
      <EarningsCalculator />

      {/* <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      > */}
      {/* ─── Top Content Area ─────────────────────────────── */}
      {/* <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 24px",
            position: "relative",
          }}
        > */}
      {/* HUD Corner Brackets */}
      {/* <div
            className="corner-bracket corner-tl"
            style={{ borderColor: "var(--cr-pink)" }}
          />
          <div
            className="corner-bracket corner-tr"
            style={{ borderColor: "var(--cr-pink)" }}
          />
          <div
            className="corner-bracket corner-bl"
            style={{ borderColor: "var(--cr-pink)" }}
          />
          <div
            className="corner-bracket corner-br"
            style={{ borderColor: "var(--cr-pink)" }}
          /> */}

      {/* Status Tag */}
      {/* <div
            className="animate-pop-bounce delay-1"
            style={{ marginBottom: "24px" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--cr-blush)",
                border: "2px solid var(--cr-pink)",
                padding: "6px 16px",
                borderRadius: "4px",
                boxShadow: "4px 4px 0px var(--cr-dark)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--cr-pink)",
                  animation: "pulse-soft 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--cr-dark)",
                }}
              >
                Built for Nigerian Creators
              </span>
            </div>
          </div>

          {/* Headline */}
      {/* <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 8vw, 72px)",
              fontWeight: 700,
              color: "var(--cr-pink)",
              lineHeight: 0.9,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              maxWidth: "700px",
            }}
          >
            <SplitText text="LET'S BUILD" active={active} delay={0.2} />
            <br />
            <SplitText text="SOMETHING" active={active} delay={0.5} />
            <br />
            <SplitText text="TOGETHER." active={active} delay={0.8} />
          </h2> */}

      {/* Subcopy */}
      {/* <p
            className="animate-slide-up delay-4 mobile-text-sm"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 1.5vw, 16px)",
              color: "var(--cr-dark)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.6,
              textAlign: "center",
              maxWidth: "480px",
              lineHeight: 1.5,
            }}
          >
            CreatorsRewards is redefining how Nigerian creators monetize their
            craft. Join the movement.
          </p> */}

      {/* Decorative ₦ Watermark */}
      {/* <div
            className="float-subtle mobile-hide"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(200px, 30vw, 400px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--cr-pink)",
              opacity: 0.04,
              zIndex: -1,
              pointerEvents: "none",
              animationDuration: "6s",
            }}
          >
            ₦
          </div>
        </div>  */}

      {/* ─── Footer ───────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          // backgroundColor: "",
          // maxWidth: "1000px",
          // margin: "0 auto",
        }}
      >
        {/* <Footer /> */}
      </div>
      {/* </div> */}
    </section>
  );
}
