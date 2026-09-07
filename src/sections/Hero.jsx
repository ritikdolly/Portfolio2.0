import React, { useEffect, useRef } from "react";
import { gsap, ease, makeMagnetic, clipTextReveal } from "../utils/gsap";
import { Typewriter } from "react-simple-typewriter";
import { personalInfo } from "../data/data";
import { ArrowRight, FileText, Github, Linkedin, Code2 } from "lucide-react";

/* ── Particle field ────────────────────────────────────────────────────── */
const PARTICLE_COUNT = 50;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  top:  `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  cyan: Math.random() > 0.5,
}));

function ParticleField() {
  const fieldRef = useRef(null);
  useEffect(() => {
    const ps = fieldRef.current?.querySelectorAll(".hero-particle");
    if (!ps) return;
    ps.forEach((p) => {
      const dur   = 5 + Math.random() * 6;
      const delay = Math.random() * 4;
      gsap.fromTo(p,
        { y: 0, autoAlpha: 0 },
        {
          y: -(80 + Math.random() * 120),
          autoAlpha: Math.random() * 0.5 + 0.2,
          duration: dur, delay, repeat: -1, ease: "none",
          onRepeat() { gsap.set(p, { autoAlpha: 0, y: 0 }); },
        }
      );
      gsap.to(p, {
        x: gsap.utils.random(-30, 30),
        duration: dur * 0.7, repeat: -1, yoyo: true,
        ease: "sine.inOut", delay: delay * 0.5,
      });
    });
    return () => gsap.killTweensOf(ps);
  }, []);

  return (
    <div ref={fieldRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`hero-particle ${p.cyan ? "bg-accent-cyan" : "bg-accent-purple"}`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
const Hero = () => {
  const sectionRef    = useRef(null);
  const headingRef    = useRef(null);   // "Hi, I'm"
  const nameRef       = useRef(null);   // gradient name (no word-split)
  const subtitleRef   = useRef(null);
  const descRef       = useRef(null);
  const ctaRef        = useRef(null);
  const scrollHintRef = useRef(null);
  const orb1Ref       = useRef(null);
  const orb2Ref       = useRef(null);
  const btn1Ref       = useRef(null);
  const btn2Ref       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Animated orbs */
      gsap.to(orb1Ref.current, { x: 50, y: -40, scale: 1.2, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(orb2Ref.current, { x: -60, y: 50, scale: 0.85, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

      /* Clip-path reveal on heading words (GSAP.com style) */
      clipTextReveal(headingRef.current, { stagger: 0.06, duration: 0.7, start: "top 100%" });

      /* Name — whole element reveal (preserves gradient span) */
      gsap.fromTo(nameRef.current,
        { autoAlpha: 0, y: 50, scale: 0.95 },
        { autoAlpha: 1, y: 0,  scale: 1,   duration: 0.9, ease: ease.back, delay: 0.35 }
      );

      /* Subtitle + description cascade */
      gsap.fromTo(subtitleRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: ease.out, delay: 0.6 }
      );
      gsap.fromTo(descRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: ease.out, delay: 0.8 }
      );

      /* CTA buttons stagger */
      const ctaChildren = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      if (ctaChildren.length) {
        gsap.fromTo(ctaChildren,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: ease.back, delay: 1.0 }
        );
      }

      /* Scroll hint */
      gsap.fromTo(scrollHintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, delay: 1.4 }
      );

      /* Fade scroll hint out when user scrolls */
      gsap.to(scrollHintRef.current, {
        autoAlpha: 0, y: -20,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=200", scrub: true },
      });

    }, sectionRef);

    /* Magnetic buttons */
    const cleanups = [];
    if (btn1Ref.current) cleanups.push(makeMagnetic(btn1Ref.current));
    if (btn2Ref.current) cleanups.push(makeMagnetic(btn2Ref.current));

    return () => { ctx.revert(); cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <div ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* "Hi, I'm" — clip-wrap reveal */}
          <div ref={headingRef}
            className="text-lg sm:text-xl font-medium tracking-widest uppercase mb-3 text-accent-cyan"
            style={{ visibility: "visible" }}
          >
            <span className="clip-wrap"><span className="clip-inner">Welcome</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner">to my</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner">portfolio</span></span>
          </div>

          {/* Name — whole element (gradient span preserved) */}
          <h1 ref={nameRef}
            className="text-5xl sm:text-6xl md:text-8xl font-black font-outfit tracking-tight mb-6 leading-tight"
            style={{ visibility: "visible" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple neon-text">
              {personalInfo.name}
            </span>
          </h1>

          {/* Typewriter */}
          <div ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-text-muted mb-8 h-12"
            style={{ visibility: "visible" }}
          >
            <Typewriter
              words={personalInfo.titles}
              loop typeSpeed={70} deleteSpeed={50} delaySpeed={1000}
              cursor cursorStyle="_"
            />
          </div>

          {/* Description */}
          <p ref={descRef}
            className="text-base sm:text-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ visibility: "visible" }}
          >
            {personalInfo.summary}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-5">
            <a ref={btn1Ref} href="#projects" className="neon-button flex items-center gap-2" style={{ visibility: "visible" }}>
              View My Work <ArrowRight size={18} />
            </a>
            <a ref={btn2Ref} href={personalInfo.resumeUrl} target="_blank" rel="noreferrer"
              className="px-8 py-3 rounded-full border border-accent-cyan text-accent-cyan font-bold hover:bg-accent-cyan/10 transition-all flex items-center gap-2 neon-border"
              style={{ visibility: "visible" }}
            >
              Resume <FileText size={18} />
            </a>
            <div className="flex items-center gap-4" style={{ visibility: "visible" }}>
              {[
                { icon: Github,   href: personalInfo.github },
                { icon: Linkedin, href: personalInfo.linkedin },
                { icon: Code2,    href: personalInfo.leetcode },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="p-3 glass-card text-text-muted hover:text-accent-cyan transition-colors">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/40 text-xs tracking-widest uppercase"
        style={{ visibility: "visible" }}
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent-cyan/60 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;
