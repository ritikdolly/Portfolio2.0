import React, { useEffect, useRef } from "react";
import { gsap, ease, make3DTilt, clipTextReveal } from "../utils/gsap";
import { certifications } from "../data/data";
import { Award, ExternalLink, Calendar } from "lucide-react";

const Certifications = () => {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading */
      clipTextReveal(headRef.current, { start: "top 85%" });

      /* ── Scatter-to-grid entrance ── */
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const sx  = gsap.utils.random(-120, 120);
        const sy  = gsap.utils.random(40, 120);
        const rot = gsap.utils.random(-20, 20);

        gsap.fromTo(card,
          { autoAlpha: 0, x: sx, y: sy, rotation: rot, scale: 0.6 },
          {
            autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1,
            duration: 0.9, delay: i * 0.09, ease: ease.back,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" },
          }
        );

        /* Award icon shimmer loop */
        const icon = card.querySelector(".cert-icon");
        if (icon) {
          gsap.to(icon, {
            boxShadow: "0 0 24px rgba(129,140,248,0.8), 0 0 48px rgba(129,140,248,0.3)",
            duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.25,
          });
        }

        /* 3D tilt hover */
        const cleanup = make3DTilt(card, { maxRotate: 10, scale: 1.04 });
        card._tiltCleanup = cleanup;
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      cardsRef.current.forEach((c) => c?._tiltCleanup?.());
    };
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <div ref={headRef} style={{ visibility: "visible" }}>
          <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
            <span className="clip-wrap"><span className="clip-inner">Certifications</span></span>
            {" "}&amp;{" "}
            <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Awards</span></span>
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {certifications.map((cert, i) => (
          <a
            key={i}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            ref={(el) => (cardsRef.current[i] = el)}
            className="glass-card group flex flex-col gap-4 hover:border-accent-violet/50 transition-colors duration-300"
            style={{ willChange: "transform", transformStyle: "preserve-3d", visibility: "visible" }}
          >
            <div className="flex justify-between items-start">
              <div
                className="cert-icon p-3 bg-accent-violet/10 rounded-xl text-accent-violet
                           group-hover:scale-110 group-hover:bg-accent-violet/20 transition-all duration-300"
              >
                <Award size={24} />
              </div>
              <ExternalLink size={16} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
            </div>

            <div>
              <h3
                className="text-lg font-bold font-outfit group-hover:text-accent-cyan transition-colors mb-1"
                style={{ visibility: "visible" }}
              >
                {cert.title}
              </h3>
              <p className="text-text-muted text-sm font-medium" style={{ visibility: "visible" }}>
                {cert.issuer}
              </p>
              <div className="flex items-center gap-1 mt-3 text-xs text-text-muted/60">
                <Calendar size={11} /> {cert.date}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-glass/5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
              View Certificate <ExternalLink size={11} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
