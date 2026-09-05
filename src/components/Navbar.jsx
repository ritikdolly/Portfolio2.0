import React, { useState, useEffect, useRef } from "react";
import { gsap, ease } from "../utils/gsap";
import { Menu, X, Github, Linkedin, Sun, Moon } from "lucide-react";
import { personalInfo } from "../data/data";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const rightActionsRef = useRef(null);

  useEffect(() => {
    // Restore theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    else setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // ── GSAP entrance — use fromTo so elements are always visible at end ──
    const validLinks = linksRef.current.filter(Boolean);

    const tl = gsap.timeline({ delay: 0.15 });

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { autoAlpha: 0, x: -30 },
        { autoAlpha: 1, x: 0, duration: 0.7, ease: ease.back }
      );
    }

    if (validLinks.length) {
      tl.fromTo(
        validLinks,
        { autoAlpha: 0, y: -16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: ease.out },
        "-=0.35"
      );
    }

    if (rightActionsRef.current) {
      tl.fromTo(
        rightActionsRef.current,
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: ease.out },
        "-=0.4"
      );
    }

    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, []);

  // Animate mobile menu items on open
  useEffect(() => {
    if (isOpen) {
      const links = document.querySelectorAll(".mobile-nav-link");
      if (links.length) {
        gsap.fromTo(
          links,
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.06, ease: ease.out, delay: 0.05 }
        );
      }
    }
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navLinks = [
    { name: "About",          href: "#about" },
    { name: "Skills",         href: "#skills" },
    { name: "Projects",       href: "#projects" },
    { name: "Education",      href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact",        href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "py-3 bg-primary/80 backdrop-blur-lg border-b border-glass/10 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo — always visible (GSAP animates from invisible to this) */}
        <a
          ref={logoRef}
          href="#"
          className="group flex items-center gap-2"
          style={{ visibility: "visible" }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-primary font-black text-xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
            RK
          </div>
          <span className="text-xl font-bold font-outfit tracking-tight hidden sm:block">
            Ritik <span className="text-accent-cyan">Kumar</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              ref={(el) => (linksRef.current[index] = el)}
              className="px-4 py-2 text-sm font-medium text-text-muted hover:text-accent-cyan rounded-lg hover:bg-glass/5 transition-all duration-300"
              style={{ visibility: "visible" }}
            >
              {link.name}
            </a>
          ))}

          <div className="h-6 w-px bg-glass/10 mx-4" />

          <div
            ref={rightActionsRef}
            className="flex items-center space-x-2"
            style={{ visibility: "visible" }}
          >
            {[
              { icon: Github,   href: personalInfo.github,   label: "GitHub" },
              { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-text-muted hover:text-accent-cyan hover:bg-glass/5 rounded-lg transition-all duration-300"
                title={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-accent-cyan hover:bg-glass/5 rounded-lg transition-all duration-300 ml-2"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile controls — always visible, no GSAP initial hide */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-text-muted hover:text-accent-cyan transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 text-text-main hover:text-accent-cyan transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary/95 backdrop-blur-xl border-b border-glass/10 shadow-2xl">
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link px-4 py-3 text-lg font-medium text-text-muted hover:text-accent-cyan hover:bg-glass/5 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
                style={{ visibility: "visible" }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex gap-4">
              <a href={personalInfo.github} target="_blank" rel="noreferrer"
                className="flex-1 py-3 glass-card flex justify-center text-accent-cyan">
                <Github size={20} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
                className="flex-1 glass-card flex justify-center text-accent-cyan">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
