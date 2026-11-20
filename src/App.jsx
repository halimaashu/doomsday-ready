import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { getMovies } from "./api";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doomsday Ready</h1>
      <Button color="primary">HeroUI kaj korche</Button>
      <p className="mt-4">Movies paoa gechhe: {movies.length}</p>
    </div>
  );
}