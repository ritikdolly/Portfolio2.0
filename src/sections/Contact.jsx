import React, { useEffect, useRef, useState } from "react";
import { gsap, ease, clipTextReveal } from "../utils/gsap";
import { personalInfo } from "../data/data";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Code2 } from "lucide-react";

const Contact = () => {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const subTextRef  = useRef(null);
  const infoRef     = useRef(null);
  const formRef     = useRef(null);
  const itemsRef    = useRef([]);

  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");  // "" | "sending" | "success" | "error"

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading */
      clipTextReveal(headRef.current, { start: "top 85%" });

      /* Sub text */
      gsap.fromTo(subTextRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: ease.out,
          scrollTrigger: { trigger: subTextRef.current, start: "top 90%", toggleActions: "play reverse play reverse" },
        }
      );

      /* ── Split dual panel: info from left, form from right ── */
      gsap.fromTo(infoRef.current,
        { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
        {
          autoAlpha: 1, clipPath: "inset(0 0% 0 0)",
          duration: 0.9, ease: ease.out, immediateRender: false,
          scrollTrigger: { trigger: infoRef.current, start: "top 82%", toggleActions: "play reverse play reverse" },
        }
      );

      gsap.fromTo(formRef.current,
        { autoAlpha: 0, clipPath: "inset(0 0 0 100%)" },
        {
          autoAlpha: 1, clipPath: "inset(0 0 0 0%)",
          duration: 0.9, ease: ease.out, immediateRender: false,
          scrollTrigger: { trigger: formRef.current, start: "top 82%", toggleActions: "play reverse play reverse" },
        }
      );

      /* Contact item stagger */
      const items = itemsRef.current.filter(Boolean);
      if (items.length) {
        gsap.fromTo(items,
          { autoAlpha: 0, x: -30 },
          { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.12, ease: ease.back,
            scrollTrigger: { trigger: infoRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* GSAP focus glow on inputs */
  const onFocus = (e) => {
    gsap.to(e.target, {
      boxShadow: "0 0 0 2px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.12)",
      duration: 0.3, ease: ease.out,
    });
  };
  const onBlur = (e) => {
    gsap.to(e.target, { boxShadow: "none", duration: 0.3 });
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in name, email, and message.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: form.name, email: form.email,
          subject: form.subject || "Portfolio Contact",
          message: form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      if (data.success) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus(""), 5000);
  };

  const inputCls = "w-full px-5 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan/60 transition-colors text-text-main text-sm disabled:opacity-40";

  return (
    <div ref={sectionRef} className="container mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <div ref={headRef} style={{ visibility: "visible" }}>
          <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-black justify-center mb-4">
            <span className="clip-wrap"><span className="clip-inner">Get</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner">in</span></span>
            {" "}
            <span className="clip-wrap"><span className="clip-inner text-accent-cyan">Touch</span></span>
          </h2>
        </div>
        <p ref={subTextRef}
          className="text-text-muted max-w-xl mx-auto text-sm leading-relaxed mt-4"
          style={{ visibility: "visible" }}
        >
          Have a project in mind or just want to say hi? I&apos;m always open to
          new opportunities and creative ideas.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

        {/* ── Info panel — clips in from left ── */}
        <div ref={infoRef} className="lg:col-span-2 space-y-8" style={{ visibility: "visible" }}>
          <div className="glass-card">
            <h3 className="text-xl font-bold font-outfit mb-8" style={{ visibility: "visible" }}>
              Contact Information
            </h3>

            <div className="space-y-6">
              {[
                { Icon: Mail,   label: "Email",    val: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { Icon: Phone,  label: "Phone",    val: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { Icon: MapPin, label: "Location", val: "Bengaluru, Karnataka", href: "#" },
              ].map(({ Icon, label, val, href }, i) => (
                <a key={i} href={href}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="flex items-center gap-4 group"
                  style={{ visibility: "visible" }}
                >
                  <div className="p-3.5 bg-glass/5 rounded-2xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{label}</p>
                    <p className="text-text-muted group-hover:text-text-main transition-colors text-sm">{val}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 pt-7 border-t border-glass/10">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-5">Connect</p>
              <div className="flex gap-4">
                {[
                  { Icon: Github,   href: personalInfo.github },
                  { Icon: Linkedin, href: personalInfo.linkedin },
                  { Icon: Code2,    href: personalInfo.leetcode },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                    className="p-3.5 bg-glass/5 rounded-2xl text-text-muted hover:text-accent-cyan hover:bg-glass/10 transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Form panel — clips in from right ── */}
        <div ref={formRef} className="lg:col-span-3" style={{ visibility: "visible" }}>
          <div className="glass-card">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted ml-1">Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={onChange}
                    onFocus={onFocus} onBlur={onBlur}
                    placeholder="John Doe" disabled={status === "sending"} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted ml-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange}
                    onFocus={onFocus} onBlur={onBlur}
                    placeholder="john@example.com" disabled={status === "sending"} className={inputCls} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted ml-1">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur}
                  placeholder="Inquiry about..." disabled={status === "sending"} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted ml-1">Message</label>
                <textarea name="message" value={form.message} onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur}
                  rows={5} placeholder="Your message..."
                  disabled={status === "sending"} className={`${inputCls} resize-none`} />
              </div>

              <button type="submit" disabled={status === "sending"}
                className={`w-full py-4 flex items-center justify-center gap-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : status === "sending" ? "bg-accent-cyan/10 text-accent-cyan/50 cursor-not-allowed"
                  : "neon-button"
                }`}
              >
                {status === "sending" && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {status === "sending" ? "Sending…"
                  : status === "success" ? "✓ Sent!"
                  : status === "error"   ? "Error — Try Again"
                  : <><Send size={18} /> Send Message</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
