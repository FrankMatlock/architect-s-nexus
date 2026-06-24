import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, ImagePlus, Star, StarOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CATEGORIES = ["Development", "Design", "Video", "Network", "AI"];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Development",
  tags: "",
  image_url: "",
  year: new Date().getFullYear(),
  client: "",
  featured: false,
  sort_order: 0,
};

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = new, else project object
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.PortfolioProject.list("sort_order", 100);
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      ...EMPTY_FORM,
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : (project.tags || ""),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, image_url: file_url }));
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        year: Number(form.year) || null,
        sort_order: Number(form.sort_order) || 0,
      };
      if (editing) {
        await base44.entities.PortfolioProject.update(editing.id, payload);
      } else {
        await base44.entities.PortfolioProject.create(payload);
      }
      await loadProjects();
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setDeleting(project.id);
    try {
      await base44.entities.PortfolioProject.delete(project.id);
      await loadProjects();
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (project) => {
    await base44.entities.PortfolioProject.update(project.id, { featured: !project.featured });
    setProjects((prev) =>
      prev.map((p) => p.id === project.id ? { ...p, featured: !p.featured } : p)
    );
  };

  return (
    <div className="min-h-screen bg-void grid-bg pt-20 lg:pt-0 lg:ml-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-gold/60">[ADMIN]</span>
              <div className="lcars-bar-gold w-16" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Vault Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in the archive
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan/10 border border-cyan/40 text-cyan font-mono text-sm tracking-wider hover:bg-cyan/20 transition-all rounded-sm"
          >
            <Plus size={16} />
            ADD PROJECT
          </button>
        </div>

        {/* Projects Table */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-panel rounded-sm p-16 text-center">
            <p className="font-mono text-sm text-muted-foreground">NO PROJECTS YET</p>
            <p className="text-xs text-muted-foreground/50 mt-2">Click "Add Project" to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-sm p-4 flex items-center gap-4 hover:border-cyan/20 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-void/60">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus size={20} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading text-sm font-semibold text-foreground truncate">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-cyan/5 border border-cyan/15 rounded-sm font-mono text-[10px] text-cyan/60 flex-shrink-0">
                      {project.category}
                    </span>
                    {project.year && (
                      <span className="font-mono text-[10px] text-muted-foreground/40">{project.year}</span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-xs text-muted-foreground mt-1 truncate max-w-lg">{project.description}</p>
                  )}
                  {project.tags?.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] text-muted-foreground/40">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort order */}
                <span className="font-mono text-xs text-muted-foreground/30 hidden md:block flex-shrink-0">
                  #{project.sort_order || 0}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleFeatured(project)}
                    title={project.featured ? "Remove from homepage" : "Feature on homepage"}
                    className={`p-2 rounded-sm transition-colors ${project.featured ? "text-gold hover:text-gold/70" : "text-muted-foreground/30 hover:text-gold/50"}`}
                  >
                    {project.featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEdit(project)}
                    className="p-2 text-muted-foreground/50 hover:text-cyan transition-colors rounded-sm"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    disabled={deleting === project.id}
                    className="p-2 text-muted-foreground/50 hover:text-red-400 transition-colors rounded-sm"
                  >
                    {deleting === project.id
                      ? <Loader2 size={16} className="animate-spin" />
                      : <Trash2 size={16} />
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-panel rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-cyan/10">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {editing ? "Edit Project" : "New Project"}
                </h2>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                    placeholder="Project title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors resize-none"
                    placeholder="Short description of the project"
                  />
                </div>

                {/* Category + Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground focus:border-cyan/40 focus:outline-none transition-colors"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Year</label>
                    <input
                      type="number"
                      min="1990"
                      max="2099"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Client + Sort Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Client</label>
                    <input
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value })}
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Sort Order</label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                      className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Tags (comma-separated)</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full bg-void/50 border border-cyan/15 rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                    placeholder="React, Node.js, CMS"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="font-mono text-[10px] text-cyan/50 tracking-widest uppercase block mb-2">Project Image</label>
                  <div className="flex gap-3 items-start">
                    {form.image_url && (
                      <div className="w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border border-cyan/15">
                        <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-void/50 border border-cyan/15 rounded-sm text-sm text-muted-foreground hover:border-cyan/30 hover:text-cyan transition-colors cursor-pointer">
                        {imageUploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                        {imageUploading ? "Uploading..." : "Upload Image"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imageUploading} />
                      </label>
                      <p className="text-[11px] text-muted-foreground/40 mt-1.5">Or paste a URL below</p>
                      <input
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        className="w-full mt-1.5 bg-void/50 border border-cyan/15 rounded-sm px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-cyan-400"
                  />
                  <label htmlFor="featured" className="text-sm text-muted-foreground cursor-pointer">
                    Feature this project on the homepage
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-cyan/10">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan/10 border border-cyan/40 text-cyan font-mono text-sm tracking-wider hover:bg-cyan/20 transition-all rounded-sm disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? "SAVING..." : "SAVE PROJECT"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}