import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease } from "../utils/gsap";
import { education } from "../data/data";
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";

const Education = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const dotsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading ──
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.75, ease: ease.back,
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
        }
      );

      // ── Timeline line draw (scrub) ──
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1, transformOrigin: "top center", ease: "none",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 75%", end: "bottom 25%", scrub: 1,
            },
          }
        );
      }

      // ── Card reveals (alternating sides) ──
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            autoAlpha: 1, x: 0, duration: 0.8, ease: ease.out,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });

      // ── Dot pulse ring animations ──
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        ScrollTrigger.create({
          trigger: dot,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: ease.elastic });
            const ring = dot.querySelector(".dot-ring");
            if (ring) {
              gsap.fromTo(
                ring,
                { scale: 1, autoAlpha: 0.8 },
                { scale: 2.5, autoAlpha: 0, duration: 1, ease: ease.out, repeat: 2, repeatDelay: 0.3 }
              );
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          ref={headingRef}
          className="text-4xl font-bold font-outfit mb-4"
          style={{ visibility: "visible" }}
        >
          Education Journey
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative">
        {/* Timeline line */}
        <div
          ref={lineRef}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/60 via-accent-violet/40 to-transparent -translate-x-1/2"
          style={{ willChange: "transform" }}
        />

        {education.map((edu, index) => (
          <div key={index} className="relative pl-8 md:pl-0">
            <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              {/* Card */}
              <div className="flex-1 w-full" ref={(el) => (cardsRef.current[index] = el)}>
                <div
                  className="glass-card group hover:border-accent-cyan/50 transition-all duration-300"
                  style={{ visibility: "visible" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-outfit">{edu.degree}</h3>
                      <p className="text-accent-violet font-medium">{edu.institution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {edu.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> India</span>
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed">{edu.description}</p>

                  {edu.resultLink && (
                    <div className="mt-4">
                      <a href={edu.resultLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/20 hover:border-accent-cyan/60 transition-all duration-300">
                        <ExternalLink size={14} /> View Result
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline dot */}
              <div
                ref={(el) => (dotsRef.current[index] = el)}
                className="absolute left-0 md:left-1/2 top-0 md:top-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-accent-cyan z-20 -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(0,242,254,0.5)]"
              >
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                <div className="dot-ring absolute inset-0 rounded-full border-2 border-accent-cyan" />
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
