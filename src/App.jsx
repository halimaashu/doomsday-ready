import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Movies from "./pages/Movies";
import RewatchPlan from "./pages/RewatchPlan";
import Booking from "./pages/Booking";

function Placeholder({ title }) {
  return <div className="mx-auto max-w-5xl p-6 text-xl">{title} (coming next)</div>;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Routes>
       <Route path="/" element={<Movies />} />
        <Route path="/rewatch" element={<RewatchPlan />} />
        <Route path="/booking" element={<Booking/>} />
      </Routes>
    </div>
  );
}