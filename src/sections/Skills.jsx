import React, { useEffect, useRef } from "react";
import { gsap, ease, make3DTilt } from "../utils/gsap";
import { skills } from "../data/data";
import { Code, Layers, Database, Settings, Cpu, CheckCircle } from "lucide-react";

const iconMap = {
  code: Code, layers: Layers, database: Database,
  settings: Settings, cpu: Cpu, check: CheckCircle,
};

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
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

      // ── 3D flip card entrance + tag pop + icon pulse ──
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Card 3D flip in
        gsap.fromTo(
          card,
          { autoAlpha: 0, rotateY: 90, scale: 0.85 },
          {
            autoAlpha: 1, rotateY: 0, scale: 1,
            duration: 0.75, delay: i * 0.08,
            ease: ease.back, transformPerspective: 900,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        // Tags pop in
        const tags = card.querySelectorAll(".skill-tag");
        gsap.fromTo(
          tags,
          { autoAlpha: 0, scale: 0.6 },
          {
            autoAlpha: 1, scale: 1,
            duration: 0.35, stagger: 0.04, ease: ease.back,
            delay: i * 0.08 + 0.4,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        // Icon looping pulse
        const icon = card.querySelector(".skill-icon");
        if (icon) {
          gsap.to(icon, {
            scale: 1.1, duration: 1.8, repeat: -1, yoyo: true,
            ease: "sine.inOut", delay: i * 0.3,
          });
        }

        // 3D tilt hover
        const cleanup = make3DTilt(card, { maxRotate: 8, scale: 1.03 });
        card._gsapTiltCleanup = cleanup;
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      cardsRef.current.forEach((card) => {
        if (card?._gsapTiltCleanup) card._gsapTiltCleanup();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Heading — no overflow:hidden */}
      <div className="text-center mb-16">
        <h2
          ref={headingRef}
          className="text-4xl font-bold font-outfit mb-4"
          style={{ visibility: "visible" }}
        >
          Skills &amp; <span className="text-accent-cyan">Expertise</span>
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup, index) => {
          const Icon = iconMap[skillGroup.icon] || Code;
          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-8 rounded-3xl bg-glass/5 border border-glass/10 hover:border-accent-cyan/30 transition-colors duration-500 group relative overflow-hidden"
              style={{ willChange: "transform", transformStyle: "preserve-3d", visibility: "visible" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-bl-full -z-10 group-hover:bg-accent-cyan/10 transition-colors" />

              <div className="flex items-center gap-5 mb-8">
                <div className="skill-icon p-4 bg-accent-cyan/10 rounded-2xl text-accent-cyan shadow-lg">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-text-main group-hover:text-accent-cyan transition-colors">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="skill-tag px-4 py-1.5 bg-primary/50 border border-glass/10 rounded-xl text-sm font-medium text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300"
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
  );
};

export default Skills;
