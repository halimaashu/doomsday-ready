import { useEffect, useState } from "react";
import { getCinemas, getBooking } from "../api";

export default function Booking() {
  const [cinemas, setCinemas] = useState([]);
  const [cinemaId, setCinemaId] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCinemas()
      .then((data) => {
        setCinemas(data);
        if (data.length > 0) setCinemaId(data[0]._id);
      })
      .catch((err) => setError(err.message));
  }, []);

  const selectedCinema = cinemas.find((c) => c._id === cinemaId);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setQuote(null);

    const size = Number(groupSize);
    if (!cinemaId) {
      setError("Please select a cinema.");
      return;
    }
    if (!Number.isInteger(size) || size < 1 || size > 10000) {
      setError("Group size must be a whole number from 1 to 10,000.");
      return;
    }

    setLoading(true);
    try {
      const data = await getBooking(cinemaId, size);
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">
          Opening night
        </p>
        <h2 className="font-heading mt-2 text-5xl md:text-6xl">Book a Watch Party</h2>
        <p className="mt-2 max-w-lg text-soft">
          Cinemas sell seats in bundles only. Enter your group size and we find
          the fewest bundles with no empty seats.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-line bg-card p-6"
      >
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
              Cinema
            </span>
            <select
              value={cinemaId}
              onChange={(e) => {
                setCinemaId(e.target.value);
                setQuote(null);
              }}
              className="w-full rounded-xl border border-line bg-page px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Select a cinema...</option>
              {cinemas.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-soft">
              Group size
            </span>
            <input
              type="number"
              placeholder="6"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="w-full rounded-xl border border-line bg-page px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-soft focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
        </div>

        {selectedCinema && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-soft">
              Bundle sizes
            </span>
            {[...selectedCinema.bundleSizes]
              .sort((a, b) => a - b)
              .map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-line px-3 py-1 text-xs font-medium"
                >
                  {s} {s === 1 ? "seat" : "seats"}
                </span>
              ))}
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm text-accent">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Get quote"}
        </button>
      </form>

      {/* Result */}
      {quote && quote.possible && (
        <div className="fade-up mt-8 rounded-2xl border border-emerald-500/40 bg-card p-6">
          <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {quote.cinema} · {quote.groupSize} people
          </p>
          <p className="font-heading mt-1 text-5xl">
            {quote.totalBundles} {quote.totalBundles === 1 ? "bundle" : "bundles"}
          </p>

          <ul className="mt-5 space-y-2">
            {quote.bundles.map((b) => (
              <li
                key={b.size}
                className="flex items-center justify-between rounded-xl border border-line bg-page px-4 py-3"
              >
                <span className="font-semibold">
                  {b.count} × {b.size}-seat bundle
                </span>
                <span className="text-sm text-soft">{b.count * b.size} seats</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-soft">
            {quote.groupSize} seats in total, with no empty seats.
          </p>
        </div>
      )}

      {quote && !quote.possible && (
        <div className="fade-up mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6">
          <p className="text-xs uppercase tracking-widest text-accent">
            {quote.cinema} · {quote.groupSize} people
          </p>
          <p className="font-heading mt-1 text-5xl text-accent">Not possible</p>
          <p className="mt-3 text-sm text-soft">
            This cinema's bundles can't add up to exactly {quote.groupSize} seats.
            Try another cinema or a different group size.
          </p>
        </div>
      )}
    </section>
  );
}