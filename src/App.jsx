import React, { useState, useEffect, useRef } from "react";
import { gsap } from "./utils/gsap";
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
const LOADER_TEXT = "Ritik Kumar.";

function Loader({ onComplete }) {
  const lettersRef = useRef([]);
  const barRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Safety fallback: if GSAP fails for any reason, still dismiss after 3s
    const safetyTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.pointerEvents = "none";
      }
      onComplete();
    }, 3500);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimer);
        // Fade out loader
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Use fromTo so letters always end at opacity:1
    tl.fromTo(
      lettersRef.current.filter(Boolean),
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.06, stagger: 0.05, ease: "back.out(2)" }
    )
      // Loading bar fills
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" },
        "-=0.2"
      )
      // Letters exit upward
      .to(
        lettersRef.current.filter(Boolean),
        { y: -60, autoAlpha: 0, duration: 0.05, stagger: 0.04, ease: "power2.in" }
      );

    return () => {
      clearTimeout(safetyTimer);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        {/* Letters — NO overflow:hidden on the wrapper */}
        <div className="flex items-center justify-center text-4xl sm:text-6xl font-black font-outfit tracking-tight mb-10">
          {LOADER_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              style={{ display: "inline-block", opacity: 0 }}
              className={char === "." ? "text-accent-cyan" : ""}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Loading bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-glass/10 mx-auto rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple rounded-full"
            style={{ transformOrigin: "left", scaleX: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  const handleLoaderDone = () => {
    setLoading(false);
  };

  // Reveal main content after loader dismisses
  useEffect(() => {
    if (!loading && mainRef.current) {
      // Make sure it's visible first, then animate
      gsap.set(mainRef.current, { autoAlpha: 1 });
      gsap.fromTo(
        mainRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-primary">
      {/* Loader — shown while loading */}
      {loading && <Loader onComplete={handleLoaderDone} />}

      {/* Main content — always in DOM but invisible until loader done */}
      <main
        ref={mainRef}
        className="relative z-10"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <div className="bg-mesh" />
        <CustomCursor />
        <Navbar />

        <section id="hero">
          <Hero />
        </section>
        <section id="about" className="py-20">
          <About />
        </section>
        <section id="skills" className="py-20">
          <Skills />
        </section>
        <section id="projects" className="py-20">
          <Projects />
        </section>
        <section id="education" className="py-20">
          <Education />
        </section>
        <section id="certifications" className="py-20">
          <Certifications />
        </section>
        <section id="contact" className="py-20">
          <Contact />
        </section>

        <footer className="py-10 text-center text-text-muted glass-effect border-t-0 border-r-0 border-l-0">
          <p>© {new Date().getFullYear()} Ritik Kumar. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
