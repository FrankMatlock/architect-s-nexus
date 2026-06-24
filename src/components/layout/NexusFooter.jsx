import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Terminal", path: "/" },
  { label: "Chronicle", path: "/chronicle" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "The Studio", path: "/studio" },
  { label: "The Vault", path: "/vault" },
  { label: "Uplink", path: "/uplink" },
];

export default function NexusFooter() {
  return (
    <footer className="lg:ml-20 border-t border-cyan/10 bg-void/80">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl text-cyan font-bold tracking-wider mb-2">
              FRANK MATLOCK
            </h3>
            <p className="font-mono text-xs text-gold/80 mb-4">
              Synthesizing Logic. Architecting Imagination.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              27 years of digital architecture, creative mastery, and forward-thinking technology solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-cyan/60 tracking-widest uppercase mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-cyan/60 tracking-widest uppercase mb-4">
              Establish Uplink
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to build something extraordinary? Open a direct channel.
            </p>
            <Link
              to="/uplink"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold font-mono text-xs tracking-wider hover:bg-gold/20 transition-colors rounded-sm"
            >
              ESTABLISH UPLINK →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cyan/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-muted-foreground/50">
            © {new Date().getFullYear()} FRANK MATLOCK — ALL SYSTEMS OPERATIONAL
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[11px] text-muted-foreground/50 hover:text-cyan/60 transition-colors">
              Privacy Protocol
            </a>
            <a href="#" className="font-mono text-[11px] text-muted-foreground/50 hover:text-cyan/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}