import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
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
        <h2 className="text-4xl font-bold font-outfit mb-4">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden relative min-h-[550px] md:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glass-card flex flex-col md:flex-row h-full bg-mesh/5 shadow-2xl relative overflow-hidden rounded-2xl border border-glass/20"
            >
              <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden group">
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    {projects[currentIndex].github && (
                      <a
                        href={projects[currentIndex].github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-glass/20 backdrop-blur-md rounded-full hover:bg-accent-cyan hover:text-primary transition-all text-white shadow-lg"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2 text-accent-cyan tracking-widest text-sm uppercase">
                  <span className="font-bold">
                    {projects[currentIndex].date}
                  </span>
                  <span className="text-text-muted/50 font-mono">
                    0{currentIndex + 1} / 0{projects.length}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-outfit mb-5 group-hover:text-accent-cyan transition-colors leading-tight">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed">
                  {projects[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[currentIndex].tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] uppercase tracking-wider font-bold text-accent-violet py-1.5 px-3 bg-accent-violet/10 rounded-full border border-accent-violet/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {projects[currentIndex].features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm md:text-base text-text-muted flex items-start gap-4"
                    >
                      <span className="text-accent-cyan font-bold mt-1 text-lg leading-none">
                        ▹
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 p-4 bg-primary/80 border border-glass/20 backdrop-blur-md rounded-full text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all z-10 shadow-xl group"
        >
          <ChevronLeft
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 p-4 bg-primary/80 border border-glass/20 backdrop-blur-md rounded-full text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all z-10 shadow-xl group"
        >
          <ChevronRight
            size={24}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-10 bg-accent-cyan shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                  : "w-3 bg-glass/40 hover:bg-glass/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
