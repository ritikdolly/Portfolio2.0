import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/data";
import { Code, Layers, Database, Settings, Cpu } from "lucide-react";

const iconMap = {
  code: Code,
  layers: Layers,
  database: Database,
  settings: Settings,
  cpu: Cpu,
};

const Skills = () => {
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
          Skills & expertise
        </h2>
        <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup, index) => {
          const Icon = iconMap[skillGroup.icon] || Code;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent-cyan/10 rounded-xl group-hover:bg-accent-cyan group-hover:text-primary transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-outfit">
                  {skillGroup.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-glass/5 border border-glass/10 rounded-full text-sm text-text-muted group-hover:border-accent-cyan/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
