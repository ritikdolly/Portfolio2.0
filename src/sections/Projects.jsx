import React, { useState, useEffect, useRef } from "react";
import { gsap, Draggable, ease, clipTextReveal } from "../utils/gsap";
import { projects } from "../data/data";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Before / After comparison slider ──────────────────────────────────── */
function BeforeAfterSlider({ src, title, date }) {
  const containerRef = useRef(null);
  const handleRef    = useRef(null);
  const afterRef     = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const handle    = handleRef.current;
    const after     = afterRef.current;
    if (!container || !handle || !after) return;

    // Start at 55% (slightly toward "after")
    const startPct = 55;
    gsap.set(after,  { clipPath: `inset(0 ${100 - startPct}% 0 0)` });
    gsap.set(handle, { left: `${startPct}%` });

    const drag = Draggable.create(handle, {
      type: "x",
      bounds: container,
      onDrag() {
        const rect = container.getBoundingClientRect();
        const pct  = Math.min(Math.max((this.pointerX - rect.left) / rect.width, 0), 1) * 100;
        gsap.set(after,  { clipPath: `inset(0 ${100 - pct}% 0 0)` });
        gsap.set(handle, { left: `${pct}%` });
      },
    })[0];

    /* Also respond to mouse move (not just drag start) for smooth UX */
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * 100;
      gsap.to(after,  { clipPath: `inset(0 ${100 - pct}% 0 0)`, duration: 0.1, ease: "none" });
      gsap.to(handle, { left: `${pct}%`, duration: 0.1, ease: "none" });
    };
    container.addEventListener("mousemove", onMove);

    return () => {
      drag.kill();
      container.removeEventListener("mousemove", onMove);
    };
  }, [src]); // re-init when slide changes

  return (
    <div ref={containerRef} className="ba-container w-full h-full select-none" title="Drag or hover to compare">
      {/* BEFORE layer — grayscale/dark with info overlay */}
      <div className="ba-layer">
        <img src={src} alt="before" className="w-full h-full object-cover filter grayscale brightness-40" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 gap-2">
          <span className="ba-label left-4 bg-black/60 text-white/60">BEFORE</span>
          <p className="text-white/60 text-xs font-mono tracking-wider">{date}</p>
        </div>
      </div>

      {/* AFTER layer — full color, revealed by clip-path */}
      <div ref={afterRef} className="ba-layer" style={{ clipPath: "inset(0 45% 0 0)" }}>
        <img src={src} alt="after" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="ba-label right-4 bg-accent-cyan text-primary">AFTER</span>
      </div>

      {/* Drag handle */}
      <div ref={handleRef}
        className="ba-handle"
        style={{ left: "55%", transform: "translateX(-50%)" }}
      >
        <div className="ba-handle-btn">⇔</div>
      </div>
    </div>
  );
}

/* ── Projects ────────────────────────────────────────────────────────── */
const Projects = () => {
  const [current, setCurrent]   = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const prevRef   = useRef(0);
  const cardRef   = useRef(null);
  const headRef   = useRef(null);

  /* Auto-play */
  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % projects.length), 9000);
    return () => clearInterval(t);
  }, [autoPlay]);

  /* Heading clip reveal (once) */
  useEffect(() => {
    if (headRef.current) clipTextReveal(headRef.current, { start: "top 85%" });
  }, []);

  /* Slide transition on index change */
  useEffect(() => {
    if (!cardRef.current) return;
    const dir = current >= prevRef.current ? 1 : -1;
    prevRef.current = current;

    gsap.fromTo(cardRef.current,
      { x: dir * 60, autoAlpha: 0, scale: 0.97 },
      { x: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: ease.out }
    );

    // Tech tags stagger
    const tags = cardRef.current.querySelectorAll(".proj-tag");
    if (tags.length) {
      gsap.fromTo(tags,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: ease.back, delay: 0.2 }
      );
    }

    // Feature list stagger
    const feats = cardRef.current.querySelectorAll(".proj-feat");
    if (feats.length) {
      gsap.fromTo(feats,
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.07, ease: ease.out, delay: 0.25 }
      );
    }
  }, [current]);

  const goTo = (idx) => { setAutoPlay(false); setCurrent(idx); };
  const p = projects[current];

  return (
    <div className="container mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <div ref={headRef} style={{ visibility: "visible" }}>
          <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
            <span className="clip-wrap"><span className="clip-inner">Featured</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Projects</span></span>
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Slide card */}
        <div
          ref={cardRef}
          className="glass-card overflow-hidden rounded-3xl border border-glass/20 p-0 flex flex-col lg:flex-row min-h-[500px]"
          style={{ willChange: "transform, opacity", visibility: "visible" }}
        >
          {/* ── Left: Before/After image ── */}
          <div className="relative w-full lg:w-[45%] h-64 sm:h-80 lg:h-auto min-h-[280px]">
            <BeforeAfterSlider src={p.image} title={p.title} date={p.date} />
          </div>

          {/* ── Right: Content ── */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4 text-xs font-bold tracking-widest uppercase">
                <span className="text-accent-cyan">{p.date}</span>
                <span className="text-text-muted/40 font-mono">
                  {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-outfit mb-3 leading-tight" style={{ visibility: "visible" }}>
                {p.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3 lg:line-clamp-none" style={{ visibility: "visible" }}>
                {p.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t, i) => (
                  <span key={i}
                    className="proj-tag text-[10px] uppercase tracking-wider font-bold text-accent-cyan px-3 py-1 bg-accent-cyan/5 rounded-full border border-accent-cyan/15"
                    style={{ visibility: "visible" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {p.features.map((f, i) => (
                  <li key={i} className="proj-feat text-sm text-text-muted flex items-start gap-3" style={{ visibility: "visible" }}>
                    <span className="text-accent-cyan mt-0.5">▹</span><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-auto flex-wrap">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 glass-card text-sm font-bold hover:text-accent-cyan transition-colors">
                  <Github size={16} /> Code
                </a>
              )}
              {p.liveUrl && p.liveUrl !== "#" && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-primary text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-10 px-2">
          <div className="flex gap-3">
            <button onClick={() => goTo((current - 1 + projects.length) % projects.length)}
              className="p-3 glass-card hover:text-accent-cyan hover:border-accent-cyan/40 transition-all group">
              <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={() => goTo((current + 1) % projects.length)}
              className="p-3 glass-card hover:text-accent-cyan hover:border-accent-cyan/40 transition-all group">
              <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-accent-cyan shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    : "w-4 bg-glass/20 hover:bg-glass/40"
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
