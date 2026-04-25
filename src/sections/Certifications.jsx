import React from "react";
import { motion } from "framer-motion";
import { certifications } from "../data/data";
import { Award, ExternalLink, Calendar } from "lucide-react";

const Certifications = () => {
  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold font-outfit mb-4">Certifications</h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card group flex flex-col gap-4 hover:border-accent-violet/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-accent-violet/10 rounded-xl text-accent-violet group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <ExternalLink
                size={18}
                className="text-text-muted group-hover:text-accent-cyan transition-colors"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold font-outfit mb-1 group-hover:text-accent-cyan transition-colors">
                {cert.title}
              </h3>
              <p className="text-text-muted font-medium text-sm mb-4">
                {cert.issuer}
              </p>

              <div className="flex items-center gap-2 text-xs text-text-muted bg-glass/5 w-fit px-3 py-1 rounded-full border border-glass/5">
                <Calendar size={12} /> {cert.date}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-glass/5 flex items-center gap-2 text-xs font-bold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
              Verify Certificate <ExternalLink size={12} />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
