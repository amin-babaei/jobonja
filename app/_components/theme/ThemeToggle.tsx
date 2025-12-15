"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border-main cursor-pointer"
    >
      {theme === "light" ? <MoonIcon className="text-muted"/> : <SunIcon className="text-yellow-500"/>}
    </button>
  );
}
