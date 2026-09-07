import React, { useEffect, useRef } from "react";
import { gsap, ease, countUp, clipTextReveal } from "../utils/gsap";
import { personalInfo } from "../data/data";
import profileImg from "../images/ritik.jpg";

/* ── Stat card data ───────────────────────────────────────────────────── */
const STATS = [
  { target: 5,  suffix: "+", label: "Projects Built"    },
  { target: 10, suffix: "+", label: "Technologies"       },
  { target: 200,  suffix: "++", label: "LeetCode Problems" },
];

const About = () => {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgRef      = useRef(null);
  const statsRef    = useRef([]);
  const numRefs     = useRef([]);
  const subTitleRef = useRef(null);
  const textRef     = useRef(null);
  const listRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Section heading — clip reveal */
      clipTextReveal(headingRef.current, { start: "top 85%" });

      /* Profile image — parallax scrub */
      gsap.to(imgRef.current, {
        y: -50, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", end: "bottom top",
          scrub: 1.5,
        },
      });

      /* Image card entrance */
      gsap.fromTo(imgWrapRef.current,
        { autoAlpha: 0, x: -70, scale: 0.95 },
        { autoAlpha: 1, x: 0,   scale: 1,
          duration: 0.9, ease: ease.out,
          scrollTrigger: { trigger: imgWrapRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
        }
      );

      /* Stat cards stagger */
      statsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: ease.back,
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play reverse play reverse" },
          }
        );
      });

      /* Counter animations */
      STATS.forEach(({ target, suffix }, i) => {
        const el = numRefs.current[i];
        if (el) countUp(el, target, suffix, statsRef.current[i]);
      });

      /* Sub-title clip reveal */
      if (subTitleRef.current) clipTextReveal(subTitleRef.current, { start: "top 88%" });

      /* Description paragraph */
      gsap.fromTo(textRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: ease.out,
          scrollTrigger: { trigger: textRef.current, start: "top 90%", toggleActions: "play reverse play reverse" },
        }
      );

      /* Info list stagger */
      if (listRef.current) {
        const items = listRef.current.querySelectorAll("li");
        gsap.fromTo(items,
          { autoAlpha: 0, x: 40 },
          { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: ease.back,
            scrollTrigger: { trigger: listRef.current, start: "top 90%", toggleActions: "play reverse play reverse" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <div ref={headingRef} style={{ visibility: "visible" }}>
          <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
            <span className="clip-wrap"><span className="clip-inner">About</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Me</span></span>
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full" />
      </div>

      {/* Stat counters */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-20">
        {STATS.map((s, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="glass-card text-center py-6 px-4"
            style={{ visibility: "visible" }}
          >
            <div
              ref={(el) => (numRefs.current[i] = el)}
              className="stat-number"
              aria-label={`${s.target}${s.suffix}`}
            >
              0{s.suffix}
            </div>
            <div className="text-xs sm:text-sm text-text-muted mt-2 font-medium tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">

        {/* Profile image */}
        <div
          ref={imgWrapRef}
          className="glass-card p-2 relative group max-w-sm w-full mx-auto"
          style={{ visibility: "visible" }}
        >
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              ref={imgRef}
              src={profileImg}
              alt={personalInfo.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ willChange: "transform" }}
            />
          </div>
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
        </div>

        {/* Text */}
        <div>
          <div ref={subTitleRef} style={{ visibility: "visible" }}>
            <h3 className="section-heading text-xl sm:text-2xl font-bold text-accent-cyan mb-5">
              <span className="clip-wrap"><span className="clip-inner">Full Stack</span></span>
              {" "}
              <span className="clip-wrap"><span className="clip-inner">Developer</span></span>
            </h3>
          </div>

          <p
            ref={textRef}
            className="text-text-muted leading-relaxed mb-7"
            style={{ visibility: "visible" }}
          >
            {personalInfo.summary}
          </p>

          <ul ref={listRef} className="space-y-4">
            {[
              { label: "Role",   val: personalInfo.role  },
              { label: "Email",  val: personalInfo.email },
              { label: "Phone",  val: personalInfo.phone },
              { label: "Status", val: "Open to Work 🟢"  },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4" style={{ visibility: "visible" }}>
                <span className="w-16 text-accent-violet font-semibold text-sm shrink-0">{item.label}</span>
                <span className="w-px h-4 bg-glass/20" />
                <span className="text-text-muted text-sm">{item.val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
