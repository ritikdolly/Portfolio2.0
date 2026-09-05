import React, { useState, useEffect, useRef } from "react";
import { gsap, ease } from "../utils/gsap";
import { projects } from "../data/data";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const headingRef = useRef(null);
  const prevIndexRef = useRef(0);

  // ── Auto-play ──
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // ── Section heading entrance ──
  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0, duration: 0.75, ease: ease.back,
        scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
      }
    );
  }, []);

  // ── Slide transition (runs on every index change) ──
  useEffect(() => {
    if (!cardRef.current) return;
    const direction = currentIndex >= prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = currentIndex;

    // Whole card slides in
    gsap.fromTo(
      cardRef.current,
      { x: direction * 80, autoAlpha: 0, scale: 0.97 },
      { x: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: ease.out }
    );

    // Tech tags pop in
    const tags = cardRef.current.querySelectorAll(".proj-tag");
    if (tags.length) {
      gsap.fromTo(
        tags,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: ease.back, delay: 0.2 }
      );
    }

    // Feature list stagger
    const feats = cardRef.current.querySelectorAll(".proj-feature");
    if (feats.length) {
      gsap.fromTo(
        feats,
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.06, ease: ease.out, delay: 0.25 }
      );
    }
  }, [currentIndex]);

  // ── Ken Burns effect on image ──
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.killTweensOf(imgRef.current);
    gsap.fromTo(
      imgRef.current,
      { scale: 1, xPercent: 0, yPercent: 0 },
      {
        scale: 1.08,
        xPercent: gsap.utils.random(-3, 3),
        yPercent: gsap.utils.random(-2, 2),
        duration: 8, ease: "none",
      }
    );
  }, [currentIndex]);

  const goTo = (idx) => {
    setIsAutoPlaying(false);
    setCurrentIndex(idx);
  };

  return (
    <div className="container mx-auto px-6">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold font-outfit mb-4"
          style={{ visibility: "visible" }}
        >
          Real-World <span className="text-accent-cyan">Projects</span>
        </h2>
        <div className="w-24 h-1.5 bg-accent-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Slide card */}
        <div
          ref={cardRef}
          className="glass-card flex flex-col lg:flex-row min-h-[500px] shadow-2xl overflow-hidden rounded-3xl border border-glass/20 p-0"
          style={{ willChange: "transform, opacity", visibility: "visible" }}
        >
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto overflow-hidden group">
            <img
              ref={imgRef}
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60 lg:opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-4">
                {projects[currentIndex].github && (
                  <a href={projects[currentIndex].github} target="_blank" rel="noreferrer"
                    className="p-4 bg-primary/80 backdrop-blur-xl rounded-full hover:bg-accent-cyan hover:text-primary transition-all text-text-main shadow-2xl border border-glass/20">
                    <Github size={24} />
                  </a>
                )}
                {projects[currentIndex].liveUrl && projects[currentIndex].liveUrl !== "#" && (
                  <a href={projects[currentIndex].liveUrl} target="_blank" rel="noreferrer"
                    className="p-4 bg-primary/80 backdrop-blur-xl rounded-full hover:bg-accent-cyan hover:text-primary transition-all text-text-main shadow-2xl border border-glass/20">
                    <ExternalLink size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 text-accent-cyan tracking-widest text-xs sm:text-sm uppercase font-bold">
                <span>{projects[currentIndex].date}</span>
                <span className="text-text-muted/40 font-mono">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-outfit mb-4 leading-tight" style={{ visibility: "visible" }}>
                {projects[currentIndex].title}
              </h3>

              <p className="text-text-muted text-sm sm:text-base mb-8 leading-relaxed line-clamp-4 lg:line-clamp-none" style={{ visibility: "visible" }}>
                {projects[currentIndex].description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {projects[currentIndex].tech.map((t, i) => (
                  <span key={i} className="proj-tag text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-accent-cyan py-1 px-3 bg-accent-cyan/5 rounded-full border border-accent-cyan/10"
                    style={{ visibility: "visible" }}>
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-3 mb-10">
                {projects[currentIndex].features.map((feature, i) => (
                  <li key={i} className="proj-feature text-xs sm:text-sm text-text-muted flex items-start gap-3"
                    style={{ visibility: "visible" }}>
                    <span className="text-accent-cyan font-bold mt-0.5">▹</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              {projects[currentIndex].github && (
                <a href={projects[currentIndex].github} target="_blank" rel="noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 bg-glass/5 hover:bg-glass/10 text-text-main rounded-xl transition-all border border-glass/10 group/btn">
                  <Github size={18} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm font-bold">Code</span>
                </a>
              )}
              {projects[currentIndex].liveUrl && projects[currentIndex].liveUrl !== "#" && (
                <a href={projects[currentIndex].liveUrl} target="_blank" rel="noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 bg-accent-cyan text-white rounded-xl transition-all border border-accent-cyan/50 hover:bg-transparent hover:text-accent-cyan group/btn shadow-[0_10px_20px_-5px_rgba(2,132,199,0.3)]">
                  <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm font-bold">Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-12 px-4 sm:px-0">
          <div className="flex gap-4">
            <button onClick={() => goTo((currentIndex - 1 + projects.length) % projects.length)}
              className="p-3 sm:p-4 bg-primary border border-glass/20 backdrop-blur-md rounded-2xl text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all shadow-xl group">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={() => goTo((currentIndex + 1) % projects.length)}
              className="p-3 sm:p-4 bg-primary border border-glass/20 backdrop-blur-md rounded-2xl text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all shadow-xl group">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {projects.map((_, idx) => (
              <button key={idx} onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? "w-10 sm:w-16 bg-accent-cyan shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                    : "w-4 sm:w-6 bg-glass/20 hover:bg-glass/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
