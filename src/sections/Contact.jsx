import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Code2,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please provide your name, email, and message to send.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Message from Portfolio",
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold font-outfit mb-4">Get in Touch</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Feel free to reach out.
          I'm always open to discussing new opportunities and creative ideas.
        </p>
        <div className="w-20 h-1 bg-accent-cyan mx-auto mt-6 rounded-full" />
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="glass-card hover:border-accent-cyan transition-all duration-500">
            <h3 className="text-2xl font-bold font-outfit mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Hyderabad, Telangana, India",
                  href: "#",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="p-4 bg-glass/5 rounded-2xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-primary transition-all duration-300 shadow-xl">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-lg text-text-muted group-hover:text-text-main transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-glass/10">
              <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">
                Social Connect
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: personalInfo.github },
                  { icon: Linkedin, href: personalInfo.linkedin },
                  { icon: Code2, href: personalInfo.leetcode },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-glass/5 rounded-2xl text-text-muted hover:text-accent-cyan hover:bg-glass/10 transition-all duration-300 shadow-xl"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3"
        >
          <div className="glass-card">
            <form className="space-y-6" onSubmit={handleSendMessage}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-muted ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={status === "sending"}
                    className="w-full px-6 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan transition-colors text-text-main disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-muted ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={status === "sending"}
                    className="w-full px-6 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan transition-colors text-text-main disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about..."
                  disabled={status === "sending"}
                  className="w-full px-6 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan transition-colors text-text-main disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-muted ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can I help you?"
                  disabled={status === "sending"}
                  className="w-full px-6 py-4 bg-glass/5 border border-glass/10 rounded-2xl outline-none focus:border-accent-cyan transition-colors text-text-main resize-none disabled:opacity-50"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-3 py-5 text-lg font-bold rounded-2xl transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : status === "error"
                      ? "bg-red-500/20 text-red-400 border border-red-500/50"
                      : status === "sending"
                        ? "bg-accent-cyan/10 text-accent-cyan/50 cursor-not-allowed border border-accent-cyan/20"
                        : "neon-button"
                }`}
              >
                {status === "sending" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Error Sending. Try Again."}
                {status === "" && (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
