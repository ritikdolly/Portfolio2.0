import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease, clipTextReveal } from "../utils/gsap";
import { education } from "../data/data";
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";

const Education = () => {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const pathRef    = useRef(null);   // SVG path element
  const dotsRef    = useRef([]);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading clip reveal */
      clipTextReveal(headRef.current, { start: "top 85%" });

      /* ── SVG curved path draw (strokeDashoffset scrub) ── */
      if (pathRef.current) {
        const pathLen = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray:  pathLen,
          strokeDashoffset: pathLen,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end:   "bottom 30%",
            scrub: 1.5,
          },
        });
      }

      /* ── Timeline dot entrances + pulse rings ── */
      dotsRef.current.filter(Boolean).forEach((dot, i) => {
        gsap.fromTo(dot,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1, autoAlpha: 1, duration: 0.5, ease: ease.elastic, delay: i * 0.15,
            scrollTrigger: { trigger: dot, start: "top 84%", toggleActions: "play reverse play reverse" },
          }
        );

        /* Expanding rings */
        const rings = dot.querySelectorAll(".dot-ring");
        ScrollTrigger.create({
          trigger: dot, start: "top 82%", toggleActions: "play reverse play reverse",
          onEnter: () => {
            rings.forEach((ring, ri) => {
              gsap.fromTo(ring,
                { scale: 1, autoAlpha: 0.8 },
                { scale: 2.8, autoAlpha: 0, duration: 1.2, ease: ease.out,
                  delay: ri * 0.3, repeat: 2, repeatDelay: 0.4 }
              );
            });
          },
        });
      });

      /* ── Card clip-path wipe reveals (alternating sides) ── */
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(card,
          { clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0% 0 0%)", autoAlpha: 1,
            duration: 0.85, ease: ease.out, immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play reverse play reverse" },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* SVG path for the timeline — vertical zigzag through 3 nodes */
  const svgPath = "M 50,40 C 50,80 50,120 50,160 C 50,200 50,240 50,280 C 50,320 50,360 50,400";

  return (
    <div ref={sectionRef} className="container mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-20">
        <div ref={headRef} style={{ visibility: "visible" }}>
          <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
            <span className="clip-wrap"><span className="clip-inner">Education</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Journey</span></span>
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full" />
      </div>

      {/* Timeline layout */}
      <div className="max-w-4xl mx-auto relative">

        {/* SVG path — desktop only */}
        <svg
          className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[100px] pointer-events-none"
          style={{ height: `${education.length * 220}px` }}
          overflow="visible"
        >
          <defs>
            <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="var(--accent-cyan)"   />
              <stop offset="100%" stopColor="var(--accent-violet)" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={`M 50,30 ${education.map((_, i) => `L 50,${30 + (i + 1) * 210}`).join(" ")}`}
            className="timeline-svg-path"
          />
        </svg>

        {/* Cards */}
        <div className="space-y-16 md:space-y-24">
          {education.map((edu, i) => (
            <div key={i} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">

              {/* Left card or spacer */}
              {i % 2 === 0 ? (
                <div ref={(el) => (cardsRef.current[i] = el)}
                  className="w-full md:w-5/12"
                  style={{ visibility: "visible" }}
                >
                  <EducationCard edu={edu} />
                </div>
              ) : (
                <div className="hidden md:block md:w-5/12" />
              )}

              {/* Center dot */}
              <div className="hidden md:flex items-center justify-center w-2/12 relative z-10">
                <div
                  ref={(el) => (dotsRef.current[i] = el)}
                  className="relative w-10 h-10 rounded-full bg-primary border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                >
                  <div className="w-3 h-3 rounded-full bg-accent-cyan" />
                  <div className="dot-ring absolute inset-0 rounded-full border-2 border-accent-cyan" />
                  <div className="dot-ring absolute inset-0 rounded-full border border-accent-violet" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>

              {/* Right card or spacer */}
              {i % 2 === 1 ? (
                <div ref={(el) => (cardsRef.current[i] = el)}
                  className="w-full md:w-5/12"
                  style={{ visibility: "visible" }}
                >
                  <EducationCard edu={edu} />
                </div>
              ) : (
                <div className="hidden md:block md:w-5/12" />
              )}

              {/* Mobile dot */}
              <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-accent-cyan" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function EducationCard({ edu }) {
  return (
    <div className="glass-card group hover:border-accent-cyan/40 transition-colors duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
          <GraduationCap size={22} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold font-outfit leading-snug" style={{ visibility: "visible" }}>
            {edu.degree}
          </h3>
          <p className="text-accent-violet font-medium text-sm mt-1" style={{ visibility: "visible" }}>
            {edu.institution}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-text-muted mb-3">
        <span className="flex items-center gap-1"><Calendar size={12} /> {edu.period}</span>
        <span className="flex items-center gap-1"><MapPin size={12} /> India</span>
      </div>

      {edu.description && (
        <p className="text-text-muted text-sm leading-relaxed mb-3" style={{ visibility: "visible" }}>
          {edu.description}
        </p>
      )}

      {edu.resultLink && (
        <a href={edu.resultLink} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent-cyan hover:underline">
          <ExternalLink size={12} /> View Result
        </a>
      )}
    </div>
  );
}

export default Education;
