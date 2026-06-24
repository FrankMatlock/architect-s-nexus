import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const chronicleImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/8e7a60ad3_generated_3c1a2957.png";

const timelineData = [
  {
    era: "1988 – 2000",
    title: "Micro Data Systems of NC — Founder & President",
    desc: "Founded and ran a technology reseller and consultancy for nearly 13 years. Guided all sales, marketing, and solution deployment activities while managing up to 10 employees across sales, engineering, and operations. Served as an outsourced IT group for numerous organizations — designing and publishing web sites with HTML, ASP, and PERL, and deploying full network and system solutions.",
    tech: ["HTML", "ASP", "PERL", "Network Design", "Systems Integration", "Web Publishing"],
  },
  {
    era: "2000 – 2003",
    title: "Stellent, Inc. — Systems Engineer & Professional Services Consultant",
    desc: "Delivered Content Management System solutions to Fortune 500 companies and government organizations. Developed proposals, led pre-sales technical demonstrations, and delivered full implementations with custom-code solutions. Collaborated with Regional Account Managers and partners, presenting to Senior Executives and leading teleconferences with clients and developers.",
    tech: ["CMS", "Stellent", "Pre-Sales Engineering", "Custom Development", "Enterprise Solutions"],
  },
  {
    era: "2004 – 2005",
    title: "Managed Data Systems — Principal ECM Consultant",
    desc: "Delivered enterprise content, document, and records management solutions. Conducted business and system analysis, produced detailed solution proposals, and partnered with software and hardware vendors to design complete client solutions. Balanced new business development with ongoing client relationships.",
    tech: ["ECM", "Document Management", "Records Management", "Solution Architecture", "Vendor Partnership"],
  },
  {
    era: "2005 – 2007",
    title: "FatWire Software — Senior Pre-Sales Field Engineer",
    desc: "Built and delivered high-level technical pre-sales presentations across verticals including Healthcare, Travel, Financial, and Sun Microsystems. Coordinated Sales and Sales Engineering teams, hosted web-based education and sales events, and actively supported marketing through trade show attendance and partner education programs.",
    tech: ["FatWire CMS", "Pre-Sales", "Web-Based Events", "Solution Selling", "Trade Shows"],
  },
  {
    era: "2007 – Present",
    title: "Triad Computer Support — Principal EDM/CMS Consultant & Web Designer",
    desc: "Designing and developing attractive, persuasive websites tailored to each client's technical requirements. Diagnosing and resolving Windows software and PC hardware issues. Delivering individualized solutions through direct client interaction, and instructing individuals and groups in basic and advanced computer use — now augmented with AI-driven development workflows.",
    tech: ["Web Design", "CMS", "EDM", "Client Consulting", "PC Support", "AI Workflows"],
  },
  {
    era: "2010 – 2023",
    title: "Diesel Equipment Company — Contractor",
    desc: "Designed a new website and custom shopping cart system for a long-standing client engagement spanning over 13 years. Also responsible for maintaining their Ubuntu web server — keeping the infrastructure stable, secure, and performant over the duration of the contract.",
    tech: ["Web Design", "E-Commerce", "Shopping Cart", "Ubuntu Server", "Linux Administration"],
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
                I started Micro Data Systems of NC in 1988 — before "web developer" was a job title — building networks, publishing websites in raw HTML and PERL, and managing the full technology stack for clients who needed an outsourced IT team they could trust.
              </p>
              <p>
                That foundation led to enterprise work: Systems Engineer at Stellent, ECM Consultant at Managed Data Systems, Senior Pre-Sales Field Engineer at FatWire Software. I've presented CMS solutions to Fortune 500 executives, closed deals across Healthcare, Financial, and Government sectors, and built the kind of technical credibility that only comes from doing the work — not just selling it.
              </p>
              <p>
                Since 2007, Triad Computer Support has been my primary vehicle — consulting, designing, and deploying web and technology solutions for clients ranging from small businesses to long-term contracts like Diesel Equipment Company's e-commerce platform and Linux server infrastructure. Today, AI-augmented development amplifies everything those years built.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}