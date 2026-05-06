import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/data";
import { Code, Layers, Database, Settings, Cpu, CheckCircle } from "lucide-react";

const iconMap = {
  code: Code,
  layers: Layers,
  database: Database,
  settings: Settings,
  cpu: Cpu,
  check: CheckCircle,
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
          Skills & <span className="text-accent-cyan">Expertise</span>
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
              className="p-8 rounded-3xl bg-glass/5 border border-glass/10 hover:border-accent-cyan/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-bl-full -z-10 group-hover:bg-accent-cyan/10 transition-colors" />
              
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-accent-cyan/10 rounded-2xl text-accent-cyan group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold font-outfit text-text-main group-hover:text-accent-cyan transition-colors">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-primary/50 border border-glass/10 rounded-xl text-sm font-medium text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300"
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
