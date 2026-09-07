import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

// ── Default ease tokens ────────────────────────────────────────────────────
export const ease = {
  out:     "power3.out",
  inOut:   "power2.inOut",
  back:    "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  expo:    "expo.out",
};

// ── Clip-path word reveal — BIDIRECTIONAL (reverses on scroll up) ──────────
// Uses toggleActions:"play reverse play reverse" so the reveal plays back
// when user scrolls up past the trigger point.
export function clipTextReveal(container, options = {}) {
  const {
    stagger  = 0.07,
    duration = 0.75,
    start    = "top 88%",
    end      = "top 40%",
    delay    = 0,
    scrub    = false,     // pass scrub:true for timeline-scrubbed reveals
  } = options;

  const inners = container.querySelectorAll(".clip-inner");
  if (!inners.length) return;

  if (scrub) {
    // Scrubbed version: tied directly to scroll position
    return gsap.fromTo(inners,
      { y: "110%" },
      {
        y: "0%",
        stagger,
        duration,
        ease: ease.back,
        immediateRender: false,
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub: 1.2,
        },
      }
    );
  }

  // Standard bidirectional: plays forward on scroll down, reverses on scroll up
  return gsap.fromTo(inners,
    { y: "110%" },
    {
      y: "0%",
      stagger,
      duration,
      delay,
      ease: ease.back,
      immediateRender: false,
      scrollTrigger: {
        trigger: container,
        start,
        end,
        toggleActions: "play reverse play reverse",
      },
    }
  );
}

// ── Scroll reveal — BIDIRECTIONAL ─────────────────────────────────────────
// toggleActions: "play reverse play reverse"
// → enters viewport: play forward
// → leaves viewport (scroll up): play reverse
export function scrollReveal(targets, trigger, options = {}) {
  const {
    y         = 40,
    x         = 0,
    duration  = 0.75,
    stagger   = 0,
    delay     = 0,
    ease: ev  = ease.out,
    start     = "top 88%",
    end       = "top 30%",
    scrub     = false,
  } = options;

  if (scrub) {
    return gsap.fromTo(targets,
      { autoAlpha: 0, y, x },
      {
        autoAlpha: 1, y: 0, x: 0, stagger, duration, ease: ev,
        scrollTrigger: { trigger, start, end, scrub: 1.2 },
      }
    );
  }

  return gsap.fromTo(targets,
    { autoAlpha: 0, y, x },
    {
      autoAlpha: 1, y: 0, x: 0, duration, stagger, delay, ease: ev,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: "play reverse play reverse",
      },
    }
  );
}

// ── Animated counter (count from 0 → target on scroll) ───────────────────
export function countUp(el, target, suffix = "+", trigger) {
  const proxy = { val: 0 };
  return gsap.to(proxy, {
    val: target,
    duration: 2,
    ease: "power2.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: trigger || el,
      start: "top 85%",
      end: "top 40%",
      toggleActions: "play reverse play reverse",
      onUpdate: undefined,
    },
    onUpdate() {
      if (el) el.textContent = Math.floor(proxy.val) + suffix;
    },
    onReverseComplete() {
      if (el) el.textContent = "0" + suffix;
    },
  });
}

// ── Infinite marquee loop ─────────────────────────────────────────────────
export function infiniteMarquee(track, speed = 25, direction = -1) {
  if (!track) return;
  const origHTML = track.innerHTML;
  track.innerHTML = origHTML + origHTML;
  return gsap.to(track, {
    xPercent: direction * 50,
    ease: "none",
    duration: speed,
    repeat: -1,
  });
}

// ── Magnetic button effect ─────────────────────────────────────────────────
export function makeMagnetic(element, strength = 0.35) {
  const onMove = (e) => {
    const r = element.getBoundingClientRect();
    gsap.to(element, {
      x: (e.clientX - r.left - r.width  / 2) * strength,
      y: (e.clientY - r.top  - r.height / 2) * strength,
      duration: 0.4, ease: ease.out,
    });
  };
  const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: ease.elastic });
  element.addEventListener("mousemove",  onMove);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mousemove",  onMove);
    element.removeEventListener("mouseleave", onLeave);
  };
}

// ── 3D card tilt on hover ──────────────────────────────────────────────────
export function make3DTilt(element, options = {}) {
  const { maxRotate = 12, scale = 1.04 } = options;
  const onMove = (e) => {
    const r = element.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(element, {
      rotateY: px * maxRotate * 2, rotateX: -py * maxRotate * 2,
      scale, duration: 0.4, ease: ease.out, transformPerspective: 800,
    });
  };
  const onLeave = () => gsap.to(element, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: ease.out });
  element.addEventListener("mousemove",  onMove);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mousemove",  onMove);
    element.removeEventListener("mouseleave", onLeave);
  };
}

export { gsap, ScrollTrigger, Draggable };
