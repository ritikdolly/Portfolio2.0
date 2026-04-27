import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import profileImg from "../images/ritik.jpeg";

const About = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-outfit mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-2 relative group w-64 md:w-full max-w-sm mx-auto"
          >
            <div className="aspect-square bg-linear-to-br from-accent-cyan via-accent-violet to-accent-purple rounded-xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
              {/* Placeholder for actual image if user provided one */}
              {/* <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-text-muted">
                {personalInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div> */}
              <img
                src={profileImg}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-1 bg-linear-to-r from-accent-cyan to-accent-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold font-outfit mb-4 text-accent-cyan">
              Full Stack Developer & Passionate Problem Solver
            </h3>
            <p className="text-text-muted leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <ul className="space-y-4">
              {[
                { label: "Role", value: personalInfo.role },
                { label: "Email", value: personalInfo.email },
                { label: "Phone", value: personalInfo.phone },
                { label: "Status", value: "Open to Work" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-24 text-accent-violet font-medium">
                    {item.label}:
                  </span>
                  <span className="text-text-muted">{item.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
