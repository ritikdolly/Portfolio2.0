import React from "react";
import { motion } from "framer-motion";
import { education } from "../data/data";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const Education = () => {
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
          Education Journey
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-glass/10 -translate-x-1/2" />

            <div
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 w-full">
                <div className="glass-card group hover:border-accent-cyan/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan group-hover:scale-110 transition-transform">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-outfit">
                        {edu.degree}
                      </h3>
                      <p className="text-accent-violet font-medium">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> India
                    </span>
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-accent-cyan z-20 -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(0,242,254,0.5)]">
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
