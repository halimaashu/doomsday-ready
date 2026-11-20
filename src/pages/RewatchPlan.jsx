import { useEffect, useState } from "react";
import { getMovies, getRewatchOrder, updateMovie } from "../api";

function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours + "h " + minutes + "m";
}

export default function RewatchPlan() {
  const [movies, setMovies] = useState([]);
  const [targetId, setTargetId] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // dropdown-er jonno movie list
  useEffect(() => {
    getMovies()
      .then((data) => {
        const sorted = [...data].sort((a, b) => a.releaseYear - b.releaseYear);
        setMovies(sorted);
        // Doomsday thakle seta-i prothome select hoye thakbe
        const doomsday = sorted.find((m) => m.title === "Avengers: Doomsday");
        if (doomsday) setTargetId(doomsday._id);
      })
      .catch((err) => setError(err.message));
  }, []);

  async function loadPlan(id) {
    setError("");
    try {
      const data = await getRewatchOrder(id);
      setPlan(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // target bodlale notun plan ane
  useEffect(() => {
    if (!targetId) return;
    setLoading(true);
    loadPlan(targetId).finally(() => setLoading(false));
  }, [targetId]);

  async function toggleWatched(movie) {
    try {
      await updateMovie(movie._id, { watched: !movie.watched });
      await loadPlan(targetId);
    } catch (err) {
      setError(err.message);
    }
  }

  const percent =
    plan && plan.totalCount > 0
      ? Math.round((plan.watchedCount / plan.totalCount) * 100)
      : 0;

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          Before the premiere
        </p>
        <h2 className="font-heading mt-2 text-5xl md:text-6xl">Rewatch Plan</h2>
        <p className="mt-2 max-w-lg text-soft">
          Pick a movie and see everything you need to watch before it, in the
          right order.
        </p>
      </div>

      {/* Target pick */}
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
          Target movie
        </span>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select a movie...</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title} ({m.releaseYear})
            </option>
          ))}
        </select>
      </label>

      {error && (
        <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-accent">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-16 animate-pulse rounded-2xl border border-line bg-card"
            />
          ))}
        </div>
      )}

      {!loading && plan && (
        <>
          {/* Progress */}
          <div className="mt-8 rounded-2xl border border-line bg-card p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-soft">Progress</p>
                <p className="font-heading mt-1 text-4xl">
                  {plan.watchedCount} of {plan.totalCount} watched
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-soft">Time left</p>
                <p className="font-heading mt-1 text-4xl text-accent">
                  {formatTime(plan.remainingRuntime)}
                </p>
              </div>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-violet-500 transition-all duration-700"
                style={{ width: percent + "%" }}
              />
            </div>
          </div>

          {/* Ordered list */}
          {plan.order.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-line bg-card px-6 py-8 text-center text-soft">
              {plan.target.title} dekhar age kichu dekhte hobe na.
            </p>
          ) : (
            <ol className="mt-8 space-y-3">
              {plan.order.map((movie, index) => (
                <li
                  key={movie._id}
                  className="fade-up flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4"
                  style={{ animationDelay: index * 60 + "ms" }}
                >
                  <span className="font-heading w-8 text-3xl text-soft">
                    {index + 1}
                  </span>

                  <div className="flex-1">
                    <p
                      className={
                        "font-semibold " +
                        (movie.watched ? "text-soft line-through" : "")
                      }
                    >
                      {movie.title}
                    </p>
                    <p className="text-xs text-soft">
                      {movie.releaseYear} · {movie.runtime} min
                    </p>
                  </div>

                  <button
                    onClick={() => toggleWatched(movie)}
                    aria-label={movie.watched ? "Mark as not watched" : "Mark as watched"}
                    className={
                      "flex h-9 w-9 items-center justify-center rounded-full border text-lg transition " +
                      (movie.watched
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-line text-transparent hover:border-accent hover:text-accent")
                    }
                  >
                    ✓
                  </button>
                </li>
              ))}
            </ol>
          )}

          <p className="mt-6 text-center text-sm text-soft">
            Tarpor dekhbe: <span className="font-semibold text-ink">{plan.target.title}</span>
          </p>
        </>
      )}
    </section>
  );
}