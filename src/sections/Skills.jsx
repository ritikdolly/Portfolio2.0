import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ease, infiniteMarquee, clipTextReveal, make3DTilt } from "../utils/gsap";
import { skills } from "../data/data";
import { Code, Layers, Database, Settings, Cpu, CheckCircle } from "lucide-react";

const ICON_MAP = {
  code: Code, layers: Layers, database: Database,
  settings: Settings, cpu: Cpu, check: CheckCircle,
};

/* Marquee ticker items */
const TICKER_ITEMS = [
  "Java", "React", "Spring Boot", "Docker", "MySQL",
  "Python", "MongoDB", "TypeScript", "REST APIs", "Tailwind CSS",
];

const Skills = () => {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const marqueeRef  = useRef(null);
  const trackRef    = useRef(null);
  const outerRef    = useRef(null);
  const cardsRef    = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile once on mount */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading clip reveal ── */
      clipTextReveal(headingRef.current, { start: "top 85%" });

      /* ── Marquee ticker ── */
      if (marqueeRef.current) infiniteMarquee(marqueeRef.current, 20);

      /* ── Mobile: simple batch reveal ── */
      if (isMobile || window.innerWidth < 768) {
        cardsRef.current.filter(Boolean).forEach((card, i) => {
          gsap.fromTo(card,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.65, delay: i * 0.08, ease: ease.back,
              scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play reverse play reverse" },
            }
          );
        });
        return;
      }

      /* ── Desktop: Pinned horizontal scroll ── */
      const track = trackRef.current;
      const outer = outerRef.current;
      if (!track || !outer) return;

      // Let browser measure the full scrollable width
      const getScrollDist = () => track.scrollWidth - window.innerWidth + 128; // 128 = padding

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollDist()}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* Card reveals inside the horizontal scroll */
      cardsRef.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(card,
          { autoAlpha: 0, rotateY: 45, scale: 0.85 },
          {
            autoAlpha: 1, rotateY: 0, scale: 1,
            duration: 0.7, ease: ease.back,
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        /* 3D tilt hover */
        const cleanup = make3DTilt(card, { maxRotate: 8, scale: 1.03 });
        card._gsapTiltCleanup = cleanup;
      });

    }, sectionRef);

    /* Refresh on resize to recalculate horizontal scroll distances */
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      cardsRef.current.forEach((c) => c?._gsapTiltCleanup?.());
    };
  }, [isMobile]);

  /* ── JSX ── */
  const isMobileLayout = isMobile || (typeof window !== "undefined" && window.innerWidth < 768);

  return (
    <div ref={sectionRef}>

      {/* Heading + Marquee — always visible */}
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center mb-12">
          <div ref={headingRef} style={{ visibility: "visible" }}>
            <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
              <span className="clip-wrap"><span className="clip-inner">Skills</span></span>
              {" "}&amp;{" "}
              <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Expertise</span></span>
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full" />
        </div>

        {/* ── Marquee ticker ── */}
        <div className="marquee-outer py-4 mb-8">
          <div ref={marqueeRef} className="marquee-track">
            {TICKER_ITEMS.map((item, i) => (
              <div key={i} className="marquee-item">
                <span className="text-accent-cyan text-lg">✦</span>
                <span className="text-sm font-bold tracking-widest text-text-muted uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: horizontal scroll outer pin ── */}
      {!isMobileLayout ? (
        <div ref={outerRef} className="h-scroll-outer w-full" style={{ visibility: "visible" }}>
          <div className="flex items-center h-screen px-16">
            <div ref={trackRef} className="h-scroll-track">
              {skills.map((sg, i) => {
                const Icon = ICON_MAP[sg.icon] || Code;
                return (
                  <div
                    key={i}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="h-scroll-card glass-card flex flex-col gap-6 hover:border-accent-cyan/40 transition-colors h-[300px]"
                    style={{ willChange: "transform", transformStyle: "preserve-3d", visibility: "visible" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan">
                        <Icon size={26} />
                      </div>
                      <h3 className="text-xl font-bold font-outfit">{sg.category}</h3>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{sg.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {sg.items.map((item, j) => (
                        <span key={j}
                          className="px-3 py-1.5 bg-primary/50 border border-glass/10 rounded-xl text-xs font-semibold text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                          style={{ visibility: "visible" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile: vertical grid ── */
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((sg, i) => {
            const Icon = ICON_MAP[sg.icon] || Code;
            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass-card flex flex-col gap-5 hover:border-accent-cyan/40 transition-colors"
                style={{ visibility: "visible" }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan"><Icon size={22} /></div>
                  <h3 className="text-lg font-bold font-outfit">{sg.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sg.items.map((item, j) => (
                    <span key={j}
                      className="px-3 py-1 bg-primary/50 border border-glass/10 rounded-lg text-xs font-semibold text-text-muted"
                      style={{ visibility: "visible" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
