import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { personalInfo } from "../data/data";
import { Github, Linkedin, Mail, ArrowRight, Code2 } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-accent-cyan font-medium tracking-widest uppercase mb-4 text-sm">
              Welcome to my portfolio
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple neon-text">
                {personalInfo.name}
              </span>
            </h1>

            <div className="text-2xl md:text-3xl text-text-muted mb-8 h-12">
              <Typewriter
                words={personalInfo.titles}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>

            <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.summary}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button flex items-center gap-2"
              >
                View My Work <ArrowRight size={18} />
              </motion.a>

              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: personalInfo.github },
                  { icon: Linkedin, href: personalInfo.linkedin },
                  { icon: Code2, href: personalInfo.leetcode },
                  { icon: Mail, href: `mailto:${personalInfo.email}` },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, color: "#00f2fe" }}
                    className="p-3 glass-card text-text-muted"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
