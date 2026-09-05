import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register all plugins once
gsap.registerPlugin(ScrollTrigger);

// ── Default ease tokens ────────────────────────────────────────────────────
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  back: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
};

// ── Split plain-text element into word-spans (safe: no overflow clipping) ─
// IMPORTANT: Only call this on elements with PLAIN TEXT content (no child HTML
// elements). Using it on elements with nested spans/HTML will destroy them.
export function splitWords(element) {
  const text = element.innerText;
  // No overflow:hidden — words are never clipped even if animation hasn't fired
  element.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${word}</span></span>`
    )
    .join(" ");
  return element.querySelectorAll(".gsap-word-inner");
}

// ── Scroll-triggered element reveal (fade + slide up) ─────────────────────
// Safe fallback: if ScrollTrigger never fires, element stays at opacity:1 / y:0
// because we use gsap.fromTo() with explicit end-state.
export function scrollReveal(targets, trigger, options = {}) {
  const {
    y = 40,
    x = 0,
    duration = 0.75,
    stagger = 0,
    delay = 0,
    ease: easeVal = ease.out,
    start = "top 88%",
  } = options;

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y, x },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      delay,
      ease: easeVal,
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
}

// ── Magnetic button effect ─────────────────────────────────────────────────
export function makeMagnetic(element, strength = 0.35) {
  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    gsap.to(element, { x: dx, y: dy, duration: 0.4, ease: ease.out });
  };

  const handleLeave = () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: ease.elastic });
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", handleLeave);

  return () => {
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("mouseleave", handleLeave);
  };
}

// ── 3D card tilt on hover ──────────────────────────────────────────────────
export function make3DTilt(element, options = {}) {
  const { maxRotate = 12, scale = 1.04 } = options;

  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(element, {
      rotateY: px * maxRotate * 2,
      rotateX: -py * maxRotate * 2,
      scale,
      duration: 0.4,
      ease: ease.out,
      transformPerspective: 800,
    });
  };

  const handleLeave = () => {
    gsap.to(element, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: ease.out,
    });
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", handleLeave);

  return () => {
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("mouseleave", handleLeave);
  };
}

export { gsap, ScrollTrigger };
