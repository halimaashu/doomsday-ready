import { useEffect, useState } from "react";
import { getMovies } from "../api";
import AddMovieForm from "../components/AddMovieForm";

function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours + "h " + minutes + "m";
}

function StatBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-4">
      <p className="text-xs uppercase tracking-widest text-soft">{label}</p>
      <p className="font-heading mt-1 text-4xl">{value}</p>
    </div>
  );
}

function LoadingCards() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="h-32 animate-pulse rounded-2xl border border-line bg-card"
        />
      ))}
    </div>
  );
}

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMovies() {
    try {
      const data = await getMovies();
      const sorted = [...data].sort((a, b) => a.releaseYear - b.releaseYear);
      setMovies(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function titleOf(id) {
    const found = movies.find((m) => m._id === id);
    return found ? found.title : "Unknown";
  }

  const watchedCount = movies.filter((m) => m.watched).length;
  const totalRuntime = movies.reduce((sum, m) => sum + m.runtime, 0);
  const percent = movies.length ? Math.round((watchedCount / movies.length) * 100) : 0;

  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          Your MCU library
        </p>
        <h2 className="font-heading mt-2 text-5xl md:text-6xl">The Timeline</h2>
        <p className="mt-2 max-w-lg text-soft">
          Every movie in release order, with what you need to watch before it.
        </p>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-accent">
          {error}
        </div>
      )}

      {/* Notun movie add korar form */}
      <AddMovieForm onAdded={loadMovies} />

      {loading ? (
        <LoadingCards />
      ) : (
        <>
          {/* Stats */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <StatBox label="Movies" value={movies.length} />
            <StatBox label="Watched" value={watchedCount} />
            <StatBox label="Total time" value={formatTime(totalRuntime)} />
          </div>

          {/* Progress bar */}
          <div className="mb-14">
            <div className="mb-2 flex justify-between text-xs text-soft">
              <span>Overall progress</span>
              <span>{percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-violet-500 transition-all duration-700"
                style={{ width: percent + "%" }}
              />
            </div>
          </div>

          {/* Timeline */}
          <ol className="relative border-l-2 border-line">
            {movies.map((movie, index) => (
              <li
                key={movie._id}
                className="fade-up relative mb-8 ml-8"
                style={{ animationDelay: index * 70 + "ms" }}
              >
                {/* dot */}
                <span
                  className={
                    "absolute -left-[41px] top-8 h-4 w-4 rounded-full ring-4 ring-page " +
                    (movie.watched
                      ? "bg-emerald-500 shadow-[0_0_14px] shadow-emerald-500/60"
                      : "bg-accent shadow-[0_0_14px] shadow-accent/60")
                  }
                />

                {/* card */}
                <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
                  {/* big faint year behind */}
                  <span className="font-heading pointer-events-none absolute -right-2 -top-4 select-none text-8xl text-ink/5 transition group-hover:text-accent/10">
                    {movie.releaseYear}
                  </span>

                  <div className="relative flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-xl tracking-widest text-accent">
                        {movie.releaseYear}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">{movie.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-line px-3 py-1 text-xs text-soft">
                        {movie.runtime} min
                      </span>
                      <span
                        className={
                          "rounded-full px-3 py-1 text-xs font-medium " +
                          (movie.watched
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-accent/15 text-accent")
                        }
                      >
                        {movie.watched ? "Watched" : "Not watched"}
                      </span>
                    </div>
                  </div>

                  {movie.prerequisites.length > 0 && (
                    <div className="relative mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                      <span className="text-xs uppercase tracking-wider text-soft">
                        Watch first
                      </span>
                      {movie.prerequisites.map((id) => (
                        <span
                          key={id}
                          className="rounded-full bg-line px-3 py-1 text-xs font-medium"
                        >
                          {titleOf(id)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}