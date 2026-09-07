import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./utils/gsap";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

// ── Loader ─────────────────────────────────────────────────────────────────
const LOADER_WORD = "RITIK.";

function Loader({ onComplete }) {
  const lettersRef = useRef([]);
  const barRef     = useRef(null);
  const wrapRef    = useRef(null);

  useEffect(() => {
    // Safety: always dismiss within 4s even if GSAP fails
    const safety = setTimeout(() => onComplete(), 4000);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safety);
        gsap.to(wrapRef.current, {
          autoAlpha: 0, duration: 0.5, ease: "power2.inOut", onComplete,
        });
      },
    });

    tl.fromTo(
      lettersRef.current.filter(Boolean),
      { y: 80, autoAlpha: 0, rotateX: -90 },
      { y: 0,  autoAlpha: 1, rotateX: 0,
        duration: 0.07, stagger: 0.055, ease: "back.out(2)",
        transformPerspective: 600,
      }
    )
      .fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", transformOrigin: "left" },
        "-=0.2"
      )
      .to(lettersRef.current.filter(Boolean),
        { y: -80, autoAlpha: 0, duration: 0.055, stagger: 0.04, ease: "power2.in" }
      );

    return () => { clearTimeout(safety); tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={wrapRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-primary"
    >
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        {/* Letters */}
        <div
          className="flex items-center justify-center text-5xl sm:text-7xl font-black font-outfit tracking-widest mb-12"
          style={{ perspective: "600px" }}
        >
          {LOADER_WORD.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              style={{ display: "inline-block", opacity: 0 }}
              className={ch === "." ? "text-accent-cyan" : ""}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        {/* Loading bar */}
        <div className="w-40 sm:w-64 h-[2px] bg-glass/10 mx-auto rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple rounded-full"
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
          />
        </div>
        <p className="text-text-muted/40 text-xs tracking-[0.3em] uppercase mt-4">
          Loading portfolio
        </p>
      </div>
    </div>
  );
}

// ── Scroll progress bar (fixed top) ───────────────────────────────────────
function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && barRef.current) {
        gsap.set(barRef.current, { scaleX: window.scrollY / h });
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={barRef} className="scroll-progress-bar" />;
}

// ── Main App ───────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  const handleLoaderDone = () => setLoading(false);

  useEffect(() => {
    if (!loading && mainRef.current) {
      // Curtain wipe: reveal from top
      gsap.fromTo(
        mainRef.current,
        { clipPath: "inset(100% 0 0 0)", autoAlpha: 1 },
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.out",
          onComplete: () => ScrollTrigger.refresh(),
        }
      );
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-primary">
      {loading && <Loader onComplete={handleLoaderDone} />}

      <main
        ref={mainRef}
        className="relative z-10"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <div className="bg-mesh" />
        <ScrollProgressBar />
        <CustomCursor />
        <Navbar />

        <section id="hero">
          <Hero />
        </section>
        <section id="about"          className="py-24 sm:py-32"><About /></section>
        <section id="skills"         className="py-24 sm:py-32"><Skills /></section>
        <section id="projects"       className="py-24 sm:py-32"><Projects /></section>
        <section id="education"      className="py-24 sm:py-32"><Education /></section>
        <section id="certifications" className="py-24 sm:py-32"><Certifications /></section>
        <section id="contact"        className="py-24 sm:py-32"><Contact /></section>

        <footer className="py-12 text-center text-text-muted border-t border-glass/10">
          <p className="text-sm tracking-wider">
            © {new Date().getFullYear()} &nbsp;
            <span className="text-accent-cyan font-bold">Ritik Kumar</span>
            &nbsp;· All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
