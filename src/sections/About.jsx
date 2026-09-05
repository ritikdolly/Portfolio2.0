import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease, scrollReveal } from "../utils/gsap";
import { personalInfo } from "../data/data";
import profileImg from "../images/ritik.jpg";

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const imgGlowRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Section heading — animate whole element, NOT word-split ──
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.75, ease: ease.back,
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
        }
      );

      // ── Profile image parallax (scrub, always visible) ──
      gsap.to(imgRef.current, {
        y: -40, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Image card entrance ──
      gsap.fromTo(
        imgWrapRef.current,
        { autoAlpha: 0, x: -60, scale: 0.95 },
        {
          autoAlpha: 1, x: 0, scale: 1, duration: 0.9, ease: ease.out,
          scrollTrigger: { trigger: imgWrapRef.current, start: "top 85%", once: true },
        }
      );

      // ── Glow pulse on entry ──
      ScrollTrigger.create({
        trigger: imgWrapRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            imgGlowRef.current,
            { opacity: 0.1 },
            { opacity: 0.5, duration: 1, yoyo: true, repeat: 1, ease: ease.inOut }
          );
        },
      });

      // ── Sub-title from right ──
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1, x: 0, duration: 0.7, ease: ease.out,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
        }
      );

      // ── Description paragraph ──
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.75, ease: ease.out,
          scrollTrigger: { trigger: textRef.current, start: "top 88%", once: true },
        }
      );

      // ── Info list items stagger ──
      if (listRef.current) {
        const items = listRef.current.querySelectorAll("li");
        gsap.fromTo(
          items,
          { autoAlpha: 0, x: 40 },
          {
            autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: ease.back,
            scrollTrigger: { trigger: listRef.current, start: "top 88%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading — NO overflow:hidden wrapper */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl font-bold font-outfit mb-4"
            style={{ visibility: "visible" }}
          >
            About Me
          </h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <div
            ref={imgWrapRef}
            className="glass-card p-2 relative group w-64 md:w-full max-w-sm mx-auto"
            style={{ visibility: "visible" }}
          >
            <div className="aspect-square bg-linear-to-br from-accent-cyan via-accent-violet to-accent-purple rounded-xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
              <img
                ref={imgRef}
                src={profileImg}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                style={{ willChange: "transform" }}
              />
            </div>
            <div
              ref={imgGlowRef}
              className="absolute -inset-1 bg-linear-to-r from-accent-cyan to-accent-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 -z-10"
            />
          </div>

          {/* Text content */}
          <div>
            <h3
              ref={titleRef}
              className="text-2xl font-bold font-outfit mb-4 text-accent-cyan"
              style={{ visibility: "visible" }}
            >
              Full Stack Developer &amp; Problem Solver
            </h3>
            <p
              ref={textRef}
              className="text-text-muted leading-relaxed mb-6"
              style={{ visibility: "visible" }}
            >
              {personalInfo.summary}
            </p>
            <ul ref={listRef} className="space-y-4">
              {[
                { label: "Role",   value: personalInfo.role },
                { label: "Email",  value: personalInfo.email },
                { label: "Phone",  value: personalInfo.phone },
                { label: "Status", value: "Open to Work" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4"
                  style={{ visibility: "visible" }}
                >
                  <span className="w-24 text-accent-violet font-medium">{item.label}:</span>
                  <span className="text-text-muted">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
