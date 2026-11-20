import { useState } from "react";
import { createMovie } from "../api";

const inputStyle =
  "w-full rounded-xl border border-line bg-page px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-soft outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function AddMovieForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const year = Number(releaseYear);
    const minutes = Number(runtime);

    // server-e pathanor age nijei ekbar check kori
    if (title.trim() === "") {
      setError("Title likho");
      return;
    }
    if (!Number.isInteger(year) || year < 1888) {
      setError("Release year ekta thik shonkha hote hobe");
      return;
    }
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 300) {
      setError("Runtime 1 theke 300 minute-er moddhe hote hobe");
      return;
    }

    setSaving(true);
    try {
      const created = await createMovie({
        title: title.trim(),
        releaseYear: year,
        runtime: minutes,
      });
      setSuccess(created.title + " add hoyeche");
      setTitle("");
      setReleaseYear("");
      setRuntime("");
      onAdded(); // list abar load korbe
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-2xl border border-line bg-card p-6"
    >
      <h3 className="font-heading text-3xl">Add a movie</h3>
      <p className="mt-1 text-sm text-soft">
        Prerequisite pore edit kora jabe.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
            Title
          </span>
          <input
            className={inputStyle}
            placeholder="Iron Man"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
            Release year
          </span>
          <input
            className={inputStyle}
            type="number"
            placeholder="2008"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
            Runtime (min)
          </span>
          <input
            className={inputStyle}
            type="number"
            placeholder="126"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-600 dark:text-emerald-400">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add movie"}
      </button>
    </form>
  );
}