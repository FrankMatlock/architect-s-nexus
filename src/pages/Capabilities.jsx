import React from "react";
import { motion } from "framer-motion";
import { Globe, Server, Palette, Cpu } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const servicesImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/d2226f350_generated_347a7f8b.png";

const services = [
  {
    icon: Globe,
    num: "01",
    title: "Full-Stack Digital Engineering",
    tagline: "27 years building the backbone of the web.",
    desc: "I specialize in robust web applications and custom content management systems that are engineered for scale, security, and longevity. From single-page applications to enterprise-grade platforms, every line of code is informed by decades of architectural understanding.",
    capabilities: [
      "Custom web application development",
      "Content management system architecture",
      "Front-end engineering (React, modern JS)",
      "Database design and optimization",
      "API development and integration",
      "Performance optimization and scaling",
    ],
  },
  {
    icon: Server,
    num: "02",
    title: "Network & Infrastructure Architecture",
    tagline: "The ironclad foundation beneath every digital solution.",
    desc: "Deep-tier expertise in computer networks and systems. I ensure your digital solutions aren't just beautiful — they are hosted on a high-performance, secure foundation. Understanding the infrastructure layer means I can troubleshoot what others can't see and optimize what others don't know exists.",
    capabilities: [
      "Network design and configuration",
      "Server administration and deployment",
      "Security auditing and hardening",
      "Cloud infrastructure management",
      "DNS, TCP/IP, and protocol expertise",
      "DevOps workflow implementation",
    ],
  },
  {
    icon: Palette,
    num: "03",
    title: "Creative Suite Mastery",
    tagline: "A complete visual production house.",
    desc: "Professional-grade execution across the Adobe ecosystem. From high-end Photoshop compositing to Premiere and After Effects motion graphics, I provide the creative firepower that most developers can't — and the technical precision that most designers don't. The result: visuals that perform as well as they look.",
    capabilities: [
      "Adobe Photoshop — compositing, retouching, manipulation",
      "Adobe Illustrator — branding, vector art, iconography",
      "Adobe InDesign — print and digital layout",
      "Adobe Premiere Pro — video editing and production",
      "Adobe After Effects — motion graphics and VFX",
      "Adobe Audition — audio editing and mastering",
    ],
  },
  {
    icon: Cpu,
    num: "04",
    title: "AI-Augmented Workflows",
    tagline: "The next era of technology, today.",
    desc: "Leading the transition into AI-assisted development. Utilizing Base44-powered AI workflows to reduce development time, optimize code quality, and generate creative assets at the speed of thought. This isn't about replacing expertise — it's about amplifying 27 years of intuition with machine intelligence.",
    capabilities: [
      "Base44 platform development",
      "AI-assisted code generation and review",
      "LLM integration and prompt engineering",
      "Automated workflow design",
      "Rapid prototyping and MVP delivery",
      "AI-augmented creative production",
    ],
  },
];

export default function Capabilities() {
  return (
    <div className="pt-20 lg:pt-0">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={servicesImage}
          alt="Futuristic server room corridor with glowing cyan light"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 to-void" />
        <div className="absolute inset-0 flex items-end pb-12 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <SectionHeader
              number="03"
              title="Capabilities"
              subtitle="Four pillars of expertise, refined over 27 years. Each discipline amplifies the others — engineering precision meets creative mastery."
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {services.map((service, i) => (
            <GlassCard key={service.num} delay={i * 0.1} className="group hover:border-cyan/25 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-cyan/10 flex items-center justify-center border border-cyan/20">
                      <service.icon size={20} className="text-cyan" />
                    </div>
                    <span className="font-mono text-xs text-gold/60">[{service.num}]</span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-cyan/60 tracking-wider mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <span className="font-mono text-[10px] text-gold/50 tracking-widest uppercase mb-3 block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-2.5">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-cyan/50 mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}