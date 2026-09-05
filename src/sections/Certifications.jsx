import React, { useEffect, useRef } from "react";
import { gsap, ease, make3DTilt } from "../utils/gsap";
import { certifications } from "../data/data";
import { Award, ExternalLink, Calendar } from "lucide-react";

const Certifications = () => {
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

      // ── Scatter-to-grid entrance ──
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const startX = gsap.utils.random(-100, 100);
        const startY = gsap.utils.random(30, 100);
        const startRot = gsap.utils.random(-15, 15);

        gsap.fromTo(
          card,
          { autoAlpha: 0, x: startX, y: startY, rotation: startRot, scale: 0.75 },
          {
            autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1,
            duration: 0.85, delay: i * 0.08, ease: ease.back,
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          }
        );

        // Award icon shimmer glow loop
        const icon = card.querySelector(".cert-icon");
        if (icon) {
          gsap.to(icon, {
            boxShadow: "0 0 20px rgba(129,140,248,0.7)",
            duration: 1.5, repeat: -1, yoyo: true,
            ease: "sine.inOut", delay: i * 0.25,
          });
        }

        // 3D tilt hover
        const cleanup = make3DTilt(card, { maxRotate: 10, scale: 1.04 });
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
      <div className="text-center mb-16">
        <h2
          ref={headingRef}
          className="text-4xl font-bold font-outfit mb-4"
          style={{ visibility: "visible" }}
        >
          Certifications
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            ref={(el) => (cardsRef.current[index] = el)}
            className="glass-card group flex flex-col gap-4 hover:border-accent-violet/50 transition-colors duration-300"
            style={{ willChange: "transform", transformStyle: "preserve-3d", visibility: "visible" }}
          >
            <div className="flex justify-between items-start">
              <div className="cert-icon p-3 bg-accent-violet/10 rounded-xl text-accent-violet group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <ExternalLink size={18} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
            </div>

            <div>
              <h3 className="text-xl font-bold font-outfit mb-1 group-hover:text-accent-cyan transition-colors"
                style={{ visibility: "visible" }}>
                {cert.title}
              </h3>
              <p className="text-text-muted font-medium text-sm mb-4">{cert.issuer}</p>
              <div className="flex items-center gap-2 text-xs text-text-muted bg-glass/5 w-fit px-3 py-1 rounded-full border border-glass/5">
                <Calendar size={12} /> {cert.date}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-glass/5 flex items-center gap-2 text-xs font-bold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
              Verify Certificate <ExternalLink size={12} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
