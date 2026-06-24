import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Monitor, Palette } from "lucide-react";

const stats = [
  {
    icon: Code,
    value: 27,
    label: "Years of Experience",
    suffix: "+",
    description: "Building the backbone of the web since 1999",
  },
  {
    icon: Monitor,
    value: 200,
    label: "Systems Architected",
    suffix: "+",
    description: "Web apps, CMS platforms, and network solutions",
  },
  {
    icon: Palette,
    value: 6,
    label: "Creative Tools Mastered",
    suffix: "",
    description: "Adobe Photoshop, Illustrator, InDesign, Premiere, After Effects, Audition",
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-heading text-4xl md:text-5xl font-bold text-cyan text-glow-cyan">
      {count}{suffix}
    </span>
  );
}

export default function PulseDashboard() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-panel rounded-sm p-8 group hover:border-cyan/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-cyan/10 flex items-center justify-center">
                  <stat.icon size={20} className="text-cyan" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="font-mono text-xs text-gold/70 tracking-wider mt-2 mb-3 uppercase">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}