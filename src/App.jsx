import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="relative min-h-screen bg-primary">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "reverse",
              }}
              className="text-4xl font-bold font-outfit neon-text"
            >
              Ritik Kumar.
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="bg-mesh" />
            <CustomCursor />
            <Navbar />

            <section id="hero">
              <Hero />
            </section>
            <section id="about" className="py-20">
              <About />
            </section>
            <section id="skills" className="py-20">
              <Skills />
            </section>
            <section id="projects" className="py-20">
              <Projects />
            </section>
            <section id="education" className="py-20">
              <Education />
            </section>
            <section id="certifications" className="py-20">
              <Certifications />
            </section>
            <section id="contact" className="py-20">
              <Contact />
            </section>

            <footer className="py-10 text-center text-text-muted glass-effect border-t-0 border-r-0 border-l-0">
              <p>
                © {new Date().getFullYear()} Ritik Kumar. All rights reserved.
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
