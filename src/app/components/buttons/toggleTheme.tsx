"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div
        className="h-12 w-12 rounded-lg border-2 border-primary/20"
        aria-label="Bouton de thème"
      />
    );
  }
  return (
    <button
      className="border-2 border-primary/20 rounded-lg inline-flex items-center justify-center p-2 transition-colors duration-300 hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
      onClick={toggleTheme}
      aria-label="Basculer entre le thème clair et sombre"
    >
      {resolvedTheme === "light" ? (
        <IoMoonOutline className="size-[1.5rem]" />
      ) : (
        <IoSunnyOutline className="size-[1.5rem]" />
      )}
    </button>
  );
}
