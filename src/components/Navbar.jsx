import { NavLink } from "react-router-dom";
import { Moon, Sun } from "@gravity-ui/icons";
import useTheme from "../useTheme";

const links = [
  { to: "/", label: "Movies" },
  { to: "/rewatch", label: "Rewatch Plan" },
  { to: "/booking", label: "Booking" },
];

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <span className="font-heading text-3xl text-accent">Doomsday Ready</span>

        <div className="flex items-center gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                "rounded-full px-4 py-1.5 text-sm font-medium transition " +
                (isActive
                  ? "bg-accent text-white"
                  : "text-soft hover:bg-line hover:text-ink")
              }
            >
              {l.label}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            aria-label="Switch theme"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-line"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </nav>
  );
}