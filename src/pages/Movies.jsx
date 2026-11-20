import { useEffect, useState } from "react";
import { Chip, Spinner } from "@heroui/react";
import { getMovies } from "../api";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovies()
      .then((data) => {
        const sorted = [...data].sort((a, b) => a.releaseYear - b.releaseYear);
        setMovies(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // prerequisite-er id theke title ber kori
  function titleOf(id) {
    const found = movies.find((m) => m._id === id);
    return found ? found.title : "Unknown";
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" />
      </div>
    );
  }

  if (error) {
    return <p className="py-20 text-center text-[#e11d48]">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-heading text-5xl">The Timeline</h2>
        <span className="text-sm text-[#a1a1aa]">{movies.length} movies</span>
      </div>

      <ol className="relative border-l border-[#2a2a38]">
        {movies.map((movie) => (
          <li key={movie._id} className="mb-8 ml-8">
            <span
              className={
                "absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full ring-4 ring-[#0b0b12] " +
                (movie.watched ? "bg-emerald-500" : "bg-[#e11d48]")
              }
            />

            <div className="rounded-2xl border border-[#2a2a38] bg-[#16161f] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-2xl text-[#e11d48]">
                    {movie.releaseYear}
                  </p>
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                </div>
                <Chip size="sm" variant="flat">
                  {movie.runtime} min
                </Chip>
              </div>

              {movie.prerequisites.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#a1a1aa]">
                    Watch first
                  </span>
                  {movie.prerequisites.map((id) => (
                    <Chip key={id} size="sm" variant="bordered">
                      {titleOf(id)}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}