import React, { useEffect, useRef } from "react";
import { gsap, ease } from "../utils/gsap";
import { personalInfo } from "../data/data";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Code2 } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const contactItemsRef = useRef([]);

  const [formData, setFormData] = React.useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus] = React.useState("");

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

      // ── Sub text ──
      gsap.fromTo(
        subTextRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1, y: 0, duration: 0.65, ease: ease.out,
          scrollTrigger: { trigger: subTextRef.current, start: "top 90%", once: true },
        }
      );

      // ── Info card from left ──
      gsap.fromTo(
        infoCardRef.current,
        { autoAlpha: 0, x: -60 },
        {
          autoAlpha: 1, x: 0, duration: 0.8, ease: ease.out,
          scrollTrigger: { trigger: infoCardRef.current, start: "top 82%", once: true },
        }
      );

      // ── Contact items stagger ──
      const items = contactItemsRef.current.filter(Boolean);
      if (items.length) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, x: -30 },
          {
            autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.12, ease: ease.back, delay: 0.2,
            scrollTrigger: { trigger: infoCardRef.current, start: "top 80%", once: true },
          }
        );
      }

      // ── Form card from right ──
      gsap.fromTo(
        formCardRef.current,
        { autoAlpha: 0, x: 60 },
        {
          autoAlpha: 1, x: 0, duration: 0.8, ease: ease.out,
          scrollTrigger: { trigger: formCardRef.current, start: "top 82%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP focus glow
  const handleFocus = (e) => {
    gsap.to(e.target, {
      boxShadow: "0 0 0 2px rgba(56,189,248,0.4), 0 0 20px rgba(56,189,248,0.1)",
      duration: 0.3, ease: ease.out,
    });
  };
  const handleBlur = (e) => {
    gsap.to(e.target, { boxShadow: "none", duration: 0.3, ease: ease.out });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please provide your name, email, and message.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name, email: formData.email,
          subject: formData.subject || "New Message from Portfolio",
          message: formData.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
      setTimeout(() => setStatus(""), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const inputClass =
    "w-full px-6 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan transition-colors text-text-main disabled:opacity-50";

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          ref={headingRef}
          className="text-4xl font-bold font-outfit mb-4"
          style={{ visibility: "visible" }}
        >
          Get in Touch
        </h2>
        <p
          ref={subTextRef}
          className="text-text-muted max-w-2xl mx-auto"
          style={{ visibility: "visible" }}
        >
          Have a project in mind or just want to say hi? Feel free to reach out.
          I&apos;m always open to discussing new opportunities and creative ideas.
        </p>
        <div className="w-20 h-1 bg-accent-cyan mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Info card */}
        <div
          ref={infoCardRef}
          className="lg:col-span-2 space-y-8"
          style={{ visibility: "visible" }}
        >
          <div className="glass-card hover:border-accent-cyan transition-all duration-500">
            <h3 className="text-2xl font-bold font-outfit mb-8">Contact Information</h3>

            <div className="space-y-6">
              {[
                { icon: Mail,   label: "Email",    value: personalInfo.email,  href: `mailto:${personalInfo.email}` },
                { icon: Phone,  label: "Phone",    value: personalInfo.phone,  href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka, India", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  ref={(el) => (contactItemsRef.current[i] = el)}
                  className="flex items-center gap-4 group cursor-pointer"
                  style={{ visibility: "visible" }}
                >
                  <div className="p-4 bg-glass/5 rounded-2xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary transition-all duration-300 shadow-xl">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg text-text-muted group-hover:text-text-main transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-glass/10">
              <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">Social Connect</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: personalInfo.github },
                  { icon: Linkedin, href: personalInfo.linkedin },
                  { icon: Code2, href: personalInfo.leetcode },
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noreferrer"
                    className="p-4 bg-glass/5 rounded-2xl text-text-muted hover:text-accent-cyan hover:bg-glass/10 transition-all duration-300 shadow-xl">
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div
          ref={formCardRef}
          className="lg:col-span-3"
          style={{ visibility: "visible" }}
        >
          <div className="glass-card">
            <form className="space-y-6" onSubmit={handleSendMessage}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-muted ml-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={handleFocus} onBlur={handleBlur}
                    placeholder="John Doe" disabled={status === "sending"} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-muted ml-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={handleFocus} onBlur={handleBlur}
                    placeholder="ritik@example.com" disabled={status === "sending"} className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted ml-1">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="Inquiry about..." disabled={status === "sending"} className={inputClass} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted ml-1">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  rows="4" placeholder="How can I help you?"
                  disabled={status === "sending"} className={`${inputClass} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full flex items-center justify-center gap-3 py-5 text-lg font-bold rounded-2xl transition-all duration-300 ${
                  status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : status === "error"   ? "bg-red-500/20 text-red-400 border border-red-500/50"
                  : status === "sending" ? "bg-accent-cyan/10 text-accent-cyan/50 cursor-not-allowed border border-accent-cyan/20"
                  : "neon-button"
                }`}
              >
                {status === "sending" && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {status === "sending" && "Sending..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error"   && "Error. Try Again."}
                {status === ""        && (<>Send Message <Send size={20} /></>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
