import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const chronicleImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/8e7a60ad3_generated_3c1a2957.png";

const timelineData = [
  {
    era: "1999 – 2005",
    title: "The Foundation",
    desc: "The early web era. Hand-coding HTML, CSS, and server-side scripts. Building the first content management systems when the term barely existed. Learning the architecture of networks from the ground up — TCP/IP, DNS, and the infrastructure that holds the internet together.",
    tech: ["HTML", "CSS", "PHP", "MySQL", "Networking"],
  },
  {
    era: "2005 – 2010",
    title: "The Expansion",
    desc: "Web 2.0 transformed everything. Dynamic applications, AJAX-driven interfaces, and the rise of content-rich platforms. Mastered the Adobe Creative Suite — Photoshop, Illustrator, InDesign — bridging the gap between code and design. Built CMS platforms serving thousands of users.",
    tech: ["JavaScript", "jQuery", "Adobe CS", "WordPress", "Drupal"],
  },
  {
    era: "2010 – 2016",
    title: "The Convergence",
    desc: "Mobile-first design became non-negotiable. Responsive frameworks, video production with Premiere and After Effects, and audio mastery through Audition. The creative and technical disciplines merged into a unified practice — every project demanded both.",
    tech: ["Responsive Design", "Premiere Pro", "After Effects", "Audition", "Node.js"],
  },
  {
    era: "2016 – 2021",
    title: "The Modern Stack",
    desc: "The component era. React, modern JavaScript, and cloud-native architectures. Building scalable web applications with sophisticated front-end interfaces and robust back-end systems. Network infrastructure matured into DevOps-aware, containerized deployments.",
    tech: ["React", "Cloud Architecture", "DevOps", "REST APIs", "Modern CSS"],
  },
  {
    era: "2021 – Present",
    title: "The AI Frontier",
    desc: "The paradigm shift. AI-assisted development with platforms like Base44 has compressed timelines that once took months into weeks. Generative tools augment the creative process — not replacing craftsmanship, but amplifying it. 27 years of pattern recognition meets machine intelligence.",
    tech: ["AI Workflows", "Base44", "Generative AI", "LLM Integration", "Automation"],
  },
];

export default function Chronicle() {
  return (
    <div className="pt-20 lg:pt-0">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={chronicleImage}
          alt="Luminous timeline visualization with glowing data nodes"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 to-void" />
        <div className="absolute inset-0 flex items-end pb-12 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <SectionHeader
              number="02"
              title="The Chronicle"
              subtitle="I don't just use tools — I understand the metal they are built on. From the early days of manual CMS architecture to the modern era of AI‑driven optimization."
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/40 via-cyan/20 to-transparent" />

            <div className="flex flex-col gap-12 md:gap-16">
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.era}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Node */}
                  <div className="absolute left-2.5 md:left-6 top-2 w-3 h-3 rounded-full bg-cyan shadow-[0_0_10px_#00F0FF66] border border-cyan/60" />

                  <span className="font-mono text-xs text-gold/70 tracking-wider">
                    {item.era}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-cyan/5 border border-cyan/15 rounded-sm font-mono text-[11px] text-cyan/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About panel */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-gold/60">[ABOUT]</span>
              <div className="lcars-bar-gold flex-1 max-w-[80px]" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Integrated Technologist
            </h3>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                I am the bridge between systems and stories. For 27 years, I've operated at the intersection where low-level network logic meets high-level visual design — the rare convergence point where a server configuration and a motion graphic share the same creative intent.
              </p>
              <p>
                My career has never followed a single track. I've built content management systems from the ground up, designed corporate identities in Illustrator, produced broadcast-quality video in Premiere, and architected network infrastructures that run mission-critical operations. Each discipline informs the others.
              </p>
              <p>
                Today, I operate at the frontier of AI-assisted development. Platforms like Base44 don't replace my expertise — they amplify 27 years of pattern recognition, letting me deliver in days what once required months. The tools change. The understanding of how systems think does not.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}