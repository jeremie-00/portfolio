"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Button } from "./buttons";

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
    <Button
      theme="icon"
      onClick={toggleTheme}
      aria-label="Basculer entre le thème clair et sombre"
    >
      {resolvedTheme === "light" ? (
        <IoMoonOutline className="size-[1.5rem]" />
      ) : (
        <IoSunnyOutline className="size-[1.5rem]" />
      )}
    </Button>
  );
}
