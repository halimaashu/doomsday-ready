import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Movies" },
  { to: "/rewatch", label: "Rewatch Plan" },
  { to: "/booking", label: "Booking" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-[#2a2a38] bg-[#0b0b12]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-heading text-3xl text-[#e11d48]">Doomsday Ready</span>
        <div className="flex gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-white border-b-2 border-[#e11d48] pb-1"
                  : "text-[#a1a1aa] hover:text-white pb-1"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}