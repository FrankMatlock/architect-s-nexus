import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ number, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-sm text-gold/60">[{number}]</span>
        <div className="lcars-bar-gold flex-1 max-w-[120px]" />
      </div>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}