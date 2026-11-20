import { useEffect, useState } from "react";

function firstTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(firstTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return [theme, toggle];
}