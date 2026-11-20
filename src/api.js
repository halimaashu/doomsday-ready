const API = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || (data.messages || []).join(", ") || "Request failed");
    error.code = data.error;
    throw error;
  }
  return data;
}

export const getMovies = () => request("/movies");
export const createMovie = (movie) =>
  request("/movies", { method: "POST", body: JSON.stringify(movie) });
export const updateMovie = (id, changes) =>
  request(`/movies/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
export const getRewatchOrder = (id) => request(`/movies/${id}/rewatch-order`);

export const getCinemas = () => request("/cinemas");
export const getBooking = (id, groupSize) =>
  request(`/cinemas/${id}/booking?groupSize=${groupSize}`);