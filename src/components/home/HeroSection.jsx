import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection({ heroImage }) {
  const [showScan, setShowScan] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScan(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Futuristic CPU cityscape glowing with teal light"
          className="w-full h-full object-cover opacity-40" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/80" />
      </div>

      {/* Scan line effect */}
      {showScan &&
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_30px_10px_#00F0FF33]" />
        </div>
      }

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}>
          
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-cyan/40" />
            <span className="font-mono text-xs text-cyan/60 tracking-[0.3em] uppercase">
              Digital Architect • Est. 1999
            </span>
            <div className="h-px w-12 bg-cyan/40" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
          
          Frank Matlock
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-heading text-lg sm:text-xl md:text-2xl text-cyan text-glow-cyan font-medium mb-4">
          
          Synthesizing Logic. Architecting Imagination.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 text-lg [font-family:'JetBrains_Mono',_var(--font-mono)] font-semibold">
          
          27 years of digital architecture. From the first line of code to the future of AI‑assisted design — building robust systems, crafting visual experiences, and pioneering next‑generation workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            to="/chronicle"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-cyan/10 border border-cyan/30 text-cyan font-mono text-sm tracking-wider hover:bg-cyan/20 hover:border-cyan/50 transition-all rounded-sm pulse-glow">
            
            INITIALIZE EXPLORATION
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            to="/uplink"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gold/10 border border-gold/30 text-gold font-mono text-sm tracking-wider hover:bg-gold/20 hover:border-gold/50 transition-all rounded-sm">
            
            ESTABLISH UPLINK
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>);

}