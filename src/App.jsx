import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function Placeholder({ title }) {
  return <div className="mx-auto max-w-5xl p-6 text-xl">{title} (coming next)</div>;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={<Placeholder title="Movies page" />} />
        <Route path="/rewatch" element={<Placeholder title="Rewatch Plan page" />} />
        <Route path="/booking" element={<Placeholder title="Booking page" />} />
      </Routes>
    </div>
  );
}