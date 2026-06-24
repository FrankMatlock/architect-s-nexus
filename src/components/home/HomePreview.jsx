import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const previews = [
  {
    num: "02",
    title: "The Chronicle",
    desc: "27 years of evolution — from early HTML to AI-augmented workflows. Trace the arc of a career defined by reinvention.",
    path: "/chronicle",
    cta: "READ THE CHRONICLE",
  },
  {
    num: "03",
    title: "Capabilities",
    desc: "Full-stack engineering, network architecture, creative production, and AI-powered development — all under one roof.",
    path: "/capabilities",
    cta: "VIEW CAPABILITIES",
  },
  {
    num: "05",
    title: "The Vault",
    desc: "A curated gallery spanning decades of digital craftsmanship — web applications, visual design, motion graphics, and more.",
    path: "/vault",
    cta: "ACCESS THE VAULT",
  },
];

export default function HomePreview() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-mono text-xs text-cyan/40 tracking-[0.3em]">EXPLORE FURTHER</span>
          <div className="lcars-bar flex-1 max-w-[200px]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previews.map((item, i) => (
            <GlassCard key={item.num} delay={i * 0.1} className="flex flex-col justify-between group hover:border-cyan/30 transition-colors">
              <div>
                <span className="font-mono text-xs text-gold/50">[{item.num}]</span>
                <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <Link
                to={item.path}
                className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-cyan/70 hover:text-cyan transition-colors tracking-wider"
              >
                {item.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}