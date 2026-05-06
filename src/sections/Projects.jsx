import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000); 
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
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
        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
          Featured <span className="text-accent-cyan">Projects</span>
        </h2>
        <div className="w-24 h-1.5 bg-accent-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card flex flex-col lg:flex-row min-h-[500px] bg-mesh/10 shadow-2xl overflow-hidden rounded-3xl border border-glass/20 p-0"
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto overflow-hidden group">
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60 lg:opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Mobile/Overlay Links */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    {projects[currentIndex].github && (
                      <a
                        href={projects[currentIndex].github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-primary/80 backdrop-blur-xl rounded-full hover:bg-accent-cyan hover:text-primary transition-all text-text-main shadow-2xl border border-glass/20"
                        title="View Source Code"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {projects[currentIndex].liveUrl && projects[currentIndex].liveUrl !== "#" && (
                      <a
                        href={projects[currentIndex].liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-primary/80 backdrop-blur-xl rounded-full hover:bg-accent-cyan hover:text-primary transition-all text-text-main shadow-2xl border border-glass/20"
                        title="View Live Demo"
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6 text-accent-cyan tracking-widest text-xs sm:text-sm uppercase font-bold">
                    <span>{projects[currentIndex].date}</span>
                    <span className="text-text-muted/40 font-mono">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-bold font-outfit mb-4 leading-tight group-hover:text-accent-cyan transition-colors">
                    {projects[currentIndex].title}
                  </h3>
                  
                  <p className="text-text-muted text-sm sm:text-base mb-8 leading-relaxed line-clamp-4 lg:line-clamp-none">
                    {projects[currentIndex].description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {projects[currentIndex].tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-accent-cyan py-1 px-3 bg-accent-cyan/5 rounded-full border border-accent-cyan/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-10">
                    {projects[currentIndex].features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-text-muted flex items-start gap-3"
                      >
                        <span className="text-accent-cyan font-bold mt-0.5">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  {projects[currentIndex].github && (
                    <a
                      href={projects[currentIndex].github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 bg-glass/5 hover:bg-glass/10 text-text-main rounded-xl transition-all border border-glass/10 group/btn"
                    >
                      <Github size={18} className="group-hover/btn:scale-110 transition-transform" />
                      <span className="text-sm font-bold">Code</span>
                    </a>
                  )}
                  {projects[currentIndex].liveUrl && projects[currentIndex].liveUrl !== "#" && (
                    <a
                      href={projects[currentIndex].liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 bg-accent-cyan text-white rounded-xl transition-all border border-accent-cyan/50 hover:bg-transparent hover:text-accent-cyan group/btn shadow-[0_10px_20px_-5px_rgba(2,132,199,0.3)]"
                    >
                      <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                      <span className="text-sm font-bold">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-12 px-4 sm:px-0">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 sm:p-4 bg-primary border border-glass/20 backdrop-blur-md rounded-2xl text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all shadow-xl group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 sm:p-4 bg-primary border border-glass/20 backdrop-blur-md rounded-2xl text-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-all shadow-xl group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? "w-10 sm:w-16 bg-accent-cyan shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                    : "w-4 sm:w-6 bg-glass/20 hover:bg-glass/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
