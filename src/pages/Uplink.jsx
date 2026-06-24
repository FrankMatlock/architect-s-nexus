import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { base44 } from "@/api/base44Client";

const contactImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/368ea879e_generated_a4358c17.png";

export default function Uplink() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: form.email,
        subject: `Uplink Received: ${form.subject || "New Message"}`,
        body: `<h2>Message from ${form.name}</h2><p><strong>Email:</strong> ${form.email}</p><p><strong>Subject:</strong> ${form.subject}</p><p>${form.message}</p>`,
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-20 lg:pt-0">
      {/* Hero banner */}
      <div className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <img
          src={contactImage}
          alt="Futuristic communication terminal with holographic interface"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 to-void" />
        <div className="absolute inset-0 flex items-end pb-12 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <SectionHeader
              number="06"
              title="Uplink"
              subtitle="Direct communication channel. Whether you're envisioning a new project, seeking a collaborator, or exploring possibilities — the line is open."
            />
          </div>
        </div>
      </div>

      {/* Contact form */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel rounded-sm p-12 text-center"
                >
                  <CheckCircle size={48} className="text-cyan mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="font-mono text-sm text-gold/70">
                    RESPONSE PENDING. STANDBY.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-panel rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-xs text-gold/60">[COMPOSE]</span>
                    <div className="lcars-bar-gold flex-1 max-w-[80px]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">
                        Comm Channel
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">
                      Transmission Content
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Your message..."
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-cyan/10 border border-cyan/40 text-cyan font-mono text-sm tracking-wider hover:bg-cyan/20 transition-all rounded-sm disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        TRANSMIT MESSAGE
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel-gold rounded-sm p-6">
                <h4 className="font-mono text-[10px] text-gold/60 tracking-widest uppercase mb-4">
                  Availability Status
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade8066]" />
                  <span className="font-heading text-sm text-foreground font-semibold">
                    Currently Accepting Projects
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to web development, creative production, AI-assisted development, and consulting engagements.
                </p>
              </div>

              <div className="glass-panel rounded-sm p-6">
                <h4 className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase mb-4">
                  Response Protocol
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan/50 mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Typical response within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan/50 mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Free initial consultation available
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan/50 mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      NDA-ready for sensitive projects
                    </span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-sm p-6">
                <h4 className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase mb-4">
                  Optimal For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Web Apps", "CMS Builds", "Motion Graphics", "Brand Identity", "AI Workflows", "Network Solutions"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-cyan/5 border border-cyan/15 rounded-sm font-mono text-[11px] text-cyan/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}