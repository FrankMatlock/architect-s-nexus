import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "01", label: "TERMINAL", path: "/" },
  { id: "02", label: "CHRONICLE", path: "/chronicle" },
  { id: "03", label: "CAPABILITIES", path: "/capabilities" },
  { id: "04", label: "THE STUDIO", path: "/studio" },
  { id: "05", label: "THE VAULT", path: "/vault" },
  { id: "06", label: "UPLINK", path: "/uplink" },
];

export default function NexusNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-20 flex-col items-center justify-between py-8 z-50 border-r border-cyan/10 bg-void/80 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-1">
          <span className="font-heading text-cyan text-lg font-bold tracking-wider">FM</span>
          <div className="w-8 h-px bg-cyan/30 mt-1" />
        </div>

        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className="group relative flex flex-col items-center"
              >
                <span className={`font-mono text-[10px] transition-colors duration-300 ${active ? "text-gold" : "text-cyan/40 group-hover:text-cyan"}`}>
                  {item.id}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 transition-all duration-300 ${active ? "bg-gold shadow-[0_0_8px_#FFB800]" : "bg-cyan/20 group-hover:bg-cyan/60"}`} />
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1.5 glass-panel rounded text-[11px] font-mono text-cyan whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-cyan/20" />
          <span className="font-mono text-[9px] text-cyan/30 writing-mode-vertical" style={{ writingMode: "vertical-rl" }}>
            2026
          </span>
        </div>
      </nav>

      {/* Mobile top bar */}
      <nav className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-void/90 backdrop-blur-xl border-b border-cyan/10" : ""}`}>
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/" className="font-heading text-cyan text-lg font-bold tracking-wider">FM</Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-cyan/70 hover:text-cyan transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => {
                const active = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-4"
                    >
                      <span className={`font-mono text-sm ${active ? "text-gold" : "text-cyan/40"}`}>
                        [{item.id}]
                      </span>
                      <span className={`font-heading text-2xl tracking-wide ${active ? "text-gold text-glow-gold" : "text-foreground"}`}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}