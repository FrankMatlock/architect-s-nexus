import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectComments from "@/components/vault/ProjectComments";

const categories = ["All", "Development", "Design", "Video", "Network", "AI"];

export default function Vault() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await base44.entities.PortfolioProject.list("-created_date", 50);
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-20 lg:pt-0">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            number="05"
            title="The Vault"
            subtitle="A curated archive of 27 years of digital craftsmanship. Web applications, visual design, motion graphics, network solutions, and AI-powered projects."
          />

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-12">
            <Filter size={14} className="text-cyan/40" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-sm font-mono text-xs tracking-wider transition-all ${
                  activeFilter === cat
                    ? "bg-cyan/15 border border-cyan/40 text-cyan"
                    : "bg-transparent border border-cyan/10 text-muted-foreground hover:text-cyan/70 hover:border-cyan/25"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-mono text-sm text-muted-foreground mb-2">
                {projects.length === 0 ? "THE VAULT IS BEING POPULATED" : "NO PROJECTS MATCH THIS FILTER"}
              </p>
              <p className="text-xs text-muted-foreground/60">
                {projects.length === 0
                  ? "Portfolio projects will appear here once added."
                  : "Try selecting a different category above."}
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group glass-panel rounded-sm overflow-hidden cursor-pointer hover:border-cyan/30 transition-colors"
                    onClick={() => setLightbox(project)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-cyan/10 border border-cyan/20 rounded-sm font-mono text-[9px] text-cyan/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-gold/60 tracking-wider">
                          {project.category?.toUpperCase()}
                        </span>
                        {project.year && (
                          <span className="font-mono text-[10px] text-muted-foreground/50">
                            {project.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-cyan transition-colors"
              >
                <X size={24} />
              </button>

              <img
                src={lightbox.image_url}
                alt={lightbox.title}
                className="w-full h-auto max-h-[65vh] object-contain rounded-sm"
              />

              <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-gold/70 tracking-wider">
                    {lightbox.category?.toUpperCase()}
                  </span>
                  {lightbox.year && (
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {lightbox.year}
                    </span>
                  )}
                  {lightbox.client && (
                    <span className="font-mono text-xs text-cyan/50">
                      — {lightbox.client}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {lightbox.title}
                </h3>
                {lightbox.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {lightbox.description}
                  </p>
                )}
                {lightbox.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {lightbox.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyan/5 border border-cyan/15 rounded-sm font-mono text-[11px] text-cyan/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <ProjectComments projectId={lightbox.id} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}