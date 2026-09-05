import React, { useEffect, useRef } from "react";
import { gsap, ease, makeMagnetic } from "../utils/gsap";
import { Typewriter } from "react-simple-typewriter";
import { personalInfo } from "../data/data";
import { Github, Linkedin, ArrowRight, Code2, FileText } from "lucide-react";

// ── Floating particle field ────────────────────────────────────────────────
function ParticleField() {
  const fieldRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const particles = field.querySelectorAll(".hero-particle");

    particles.forEach((p) => {
      const delay = Math.random() * 4;
      const dur = 5 + Math.random() * 6;
      gsap.fromTo(
        p,
        { y: 0, autoAlpha: 0 },
        {
          y: -(80 + Math.random() * 120),
          autoAlpha: gsap.utils.random(0.3, 0.7),
          duration: dur,
          delay,
          repeat: -1,
          ease: "none",
          onRepeat() {
            gsap.set(p, { autoAlpha: 0, y: 0 });
          },
        }
      );
      gsap.to(p, {
        x: gsap.utils.random(-30, 30),
        duration: dur * 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay * 0.5,
      });
    });

    return () => gsap.killTweensOf(particles);
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    cyan: Math.random() > 0.5,
  }));

  return (
    <div ref={fieldRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`hero-particle absolute rounded-full ${
            p.cyan ? "bg-accent-cyan" : "bg-accent-purple"
          }`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: 0 }}
        />
      ))}
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef(null);
  // Individual refs for each animatable element — avoids destroying nested HTML
  const greetRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const scrollHintRef = useRef(null);
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Animated background orbs ──
      gsap.to(orb1Ref.current, {
        x: 40, y: -30, scale: 1.15,
        duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: -50, y: 40, scale: 0.9,
        duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });

      // ── Cinematic entrance timeline ──
      // Animate individual elements WITHOUT splitting innerHTML
      // (preserves React-rendered gradient <span> inside h1)
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        greetRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: ease.out }
      )
        .fromTo(
          nameRef.current,
          { autoAlpha: 0, y: 40, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: ease.back },
          "-=0.2"
        )
        .fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: ease.out },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: ease.out },
          "-=0.3"
        );

      // Stagger CTA row children
      if (ctaRef.current) {
        const children = Array.from(ctaRef.current.children);
        tl.fromTo(
          children,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: ease.back },
          "-=0.3"
        );
      }

      // Scroll hint fade in
      tl.fromTo(
        scrollHintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "-=0.2"
      );
    }, containerRef);

    // ── Magnetic buttons ──
    const cleanups = [];
    if (btnRef1.current) cleanups.push(makeMagnetic(btnRef1.current));
    if (btnRef2.current) cleanups.push(makeMagnetic(btnRef2.current));

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />

      {/* Particle field */}
      <ParticleField />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Welcome label */}
          <p
            ref={greetRef}
            className="text-accent-cyan font-medium tracking-widest uppercase mb-4 text-sm"
            style={{ visibility: "visible" }}
          >
            Welcome to my portfolio
          </p>

          {/* Main headline — kept as ONE block so gradient span is preserved */}
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight leading-tight"
            style={{ visibility: "visible" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple neon-text">
              {personalInfo.name}
            </span>
          </h1>

          {/* Typewriter */}
          <div
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-text-muted mb-8 h-12"
            style={{ visibility: "visible" }}
          >
            <Typewriter
              words={personalInfo.titles}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ visibility: "visible" }}
          >
            {personalInfo.summary}
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-6">
            <a
              ref={btnRef1}
              href="#projects"
              className="neon-button flex items-center gap-2"
              style={{ visibility: "visible" }}
            >
              View My Work <ArrowRight size={18} />
            </a>

            <a
              ref={btnRef2}
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 rounded-full border border-accent-cyan text-accent-cyan font-bold hover:bg-accent-cyan/10 transition-all duration-300 flex items-center gap-2 neon-border"
              style={{ visibility: "visible" }}
            >
              View Resume <FileText size={18} />
            </a>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: personalInfo.github },
                { icon: Linkedin, href: personalInfo.linkedin },
                { icon: Code2, href: personalInfo.leetcode },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 glass-card text-text-muted hover:text-accent-cyan transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/40 text-xs tracking-widest uppercase"
        style={{ visibility: "visible" }}
      >
        <span>Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent-cyan/50 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;
