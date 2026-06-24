import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", gold = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`${gold ? "glass-panel-gold" : "glass-panel"} rounded-sm p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}