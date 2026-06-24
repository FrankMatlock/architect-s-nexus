import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Send } from "lucide-react";

const EMPTY_FORM = { author_name: "", author_email: "", message: "" };

export default function ProjectComments({ projectId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setSubmitted(false);
    base44.entities.ProjectComment.filter({ project_id: projectId }, "-created_date", 50)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newComment = await base44.entities.ProjectComment.create({
        ...form,
        project_id: projectId,
      });
      setComments((prev) => [newComment, ...prev]);
      setForm(EMPTY_FORM);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-cyan/10">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xs text-cyan/40 tracking-[0.2em]">FEEDBACK & QUESTIONS</span>
        <div className="lcars-bar flex-1 max-w-[80px]" />
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            required
            placeholder="Your name"
            value={form.author_name}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            className="bg-void/60 border border-cyan/15 rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.author_email}
            onChange={(e) => setForm({ ...form, author_email: e.target.value })}
            className="bg-void/60 border border-cyan/15 rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors"
          />
        </div>
        <textarea
          required
          rows={3}
          placeholder="Leave a comment or ask a question..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-void/60 border border-cyan/15 rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/40 focus:outline-none transition-colors resize-none"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2 bg-cyan/10 border border-cyan/40 text-cyan font-mono text-xs tracking-wider hover:bg-cyan/20 transition-all rounded-sm disabled:opacity-50"
          >
            {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            {submitting ? "SENDING..." : "TRANSMIT"}
          </button>
          {submitted && (
            <span className="font-mono text-xs text-cyan/60">Message received.</span>
          )}
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-5 h-5 border border-cyan/20 border-t-cyan rounded-full animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <p className="font-mono text-xs text-muted-foreground/40 py-2">No feedback yet. Be the first.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="glass-panel rounded-sm p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs text-cyan/70 font-semibold">{c.author_name}</span>
                <span className="font-mono text-[10px] text-muted-foreground/40">
                  {new Date(c.created_date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}