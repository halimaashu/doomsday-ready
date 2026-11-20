import { useState } from "react";
import { updateMovie } from "../api";

export default function EditPrerequisitesModal({ movie, allMovies, onClose, onSaved }) {
  const [selected, setSelected] = useState(movie.prerequisites);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // nijeke list-e dekhabo na
  const choices = allMovies.filter((m) => m._id !== movie._id);

  function toggle(id) {
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const updated = await updateMovie(movie._id, { prerequisites: selected });
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Edit prerequisites</p>
        <h3 className="font-heading mt-1 text-3xl">{movie.title}</h3>
        <p className="mt-1 text-sm text-soft">Ei movie dekhar age ja ja dekhte hobe, tick koro.</p>

        <ul className="mt-5 max-h-72 space-y-2 overflow-y-auto pr-1">
          {choices.map((m) => {
            const checked = selected.includes(m._id);
            return (
              <li key={m._id}>
                <label
                  className={
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition " +
                    (checked
                      ? "border-accent bg-accent/10"
                      : "border-line hover:border-accent/50")
                  }
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(m._id)}
                    className="h-4 w-4 accent-[#e11d48]"
                  />
                  <span className="flex-1">{m.title}</span>
                  <span className="text-xs text-soft">{m.releaseYear}</span>
                </label>
              </li>
            );
          })}
        </ul>

        {error && (
          <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full border border-line px-5 py-2 text-sm text-soft transition hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}