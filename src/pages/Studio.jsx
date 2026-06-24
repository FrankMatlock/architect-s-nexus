import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const studioImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/bf2f9c2a1_generated_cb1a0de9.png";
const aiImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/588d34899_generated_94989b42.png";

const adobeTools = [
  {
    name: "Photoshop",
    abbr: "Ps",
    color: "#31A8FF",
    desc: "Advanced compositing, photo manipulation, digital painting, and asset creation. From product mockups to surreal visual compositions — Photoshop remains the foundational canvas for pixel-perfect work.",
    expertise: "Expert — 20+ years",
  },
  {
    name: "Illustrator",
    abbr: "Ai",
    color: "#FF9A00",
    desc: "Vector graphics, brand identity systems, iconography, and scalable visual design. Every logo, every illustration, every piece of visual language engineered to scale from favicon to billboard.",
    expertise: "Expert — 18+ years",
  },
  {
    name: "InDesign",
    abbr: "Id",
    color: "#FF3366",
    desc: "Print and digital layout — brochures, reports, presentations, and multi-page publications. Typographic precision meets creative layout for documents that communicate with authority.",
    expertise: "Advanced — 15+ years",
  },
  {
    name: "Premiere Pro",
    abbr: "Pr",
    color: "#9999FF",
    desc: "Professional video editing and post-production. From corporate videos to creative films — color grading, multi-cam editing, and seamless audio sync for broadcast-quality output.",
    expertise: "Expert — 12+ years",
  },
  {
    name: "After Effects",
    abbr: "Ae",
    color: "#9999FF",
    desc: "Motion graphics, visual effects, and dynamic animations. Title sequences, explainer videos, UI animations — bringing static designs to life with cinematic movement.",
    expertise: "Advanced — 10+ years",
  },
  {
    name: "Audition",
    abbr: "Au",
    color: "#00E4BB",
    desc: "Audio editing, mixing, and mastering. Podcast production, voiceover cleanup, soundtrack design, and multi-track mixing for professional sound output.",
    expertise: "Proficient — 8+ years",
  },
];

export default function Studio() {
  const [activeTool, setActiveTool] = useState(null);
  const active = adobeTools.find((t) => t.abbr === activeTool) || null;

  return (
    <div className="pt-20 lg:pt-0">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={studioImage}
          alt="Abstract liquid metal shapes in creative software colors"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 to-void" />
        <div className="absolute inset-0 flex items-end pb-12 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <SectionHeader
              number="04"
              title="The Studio"
              subtitle="Where creative mastery meets AI-augmented workflows. The complete production toolkit — from pixel to pipeline."
            />
          </div>
        </div>
      </div>

      {/* Adobe Creative Suite Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-cyan/40 tracking-[0.2em]">ADOBE CREATIVE SUITE</span>
            <div className="lcars-bar flex-1 max-w-[120px]" />
          </div>

          {/* Tool nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {adobeTools.map((tool) => {
              const isActive = activeTool === tool.abbr;
              return (
                <motion.button
                  key={tool.abbr}
                  onClick={() => setActiveTool(isActive ? null : tool.abbr)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative glass-panel rounded-sm p-5 text-center transition-all cursor-pointer"
                  style={{
                    borderColor: isActive ? tool.color + "66" : undefined,
                    boxShadow: isActive ? `0 0 20px ${tool.color}22` : undefined,
                  }}
                >
                  <span
                    className="font-heading text-2xl font-bold block"
                    style={{ color: tool.color }}
                  >
                    {tool.abbr}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground mt-1 block">
                    {tool.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded detail */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.abbr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-sm p-8"
                style={{ borderColor: active.color + "33" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-heading text-3xl font-bold" style={{ color: active.color }}>
                    {active.abbr}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Adobe {active.name}
                    </h3>
                    <span className="font-mono text-xs text-gold/70">{active.expertise}</span>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {active.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Base44 / AI Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-gold/60 tracking-[0.2em]">AI-AUGMENTED WORKFLOWS</span>
                <div className="lcars-bar-gold flex-1 max-w-[80px]" />
              </div>
              <h3 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-6">
                The Future is Already Here
              </h3>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Base44 represents the cutting edge of AI-assisted development — a platform that transforms how applications are conceived, built, and deployed. I leverage Base44 to compress development timelines that once spanned months into focused sprints of days.
                </p>
                <p>
                  But speed without wisdom is reckless. What makes Base44 powerful in my hands is 27 years of architectural intuition guiding every AI-assisted decision. The platform generates; I architect. The platform accelerates; I steer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { stat: "10×", label: "Faster Development" },
                  { stat: "100%", label: "Human Oversight" },
                  { stat: "27yr", label: "Pattern Recognition" },
                  { stat: "∞", label: "Possibilities" },
                ].map((item) => (
                  <div key={item.label} className="glass-panel-gold rounded-sm p-4 text-center">
                    <span className="font-heading text-2xl font-bold text-gold text-glow-gold block">
                      {item.stat}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-sm overflow-hidden"
            >
              <img
                src={aiImage}
                alt="Glowing crystalline lattice representing a neural network"
                className="w-full h-auto opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}