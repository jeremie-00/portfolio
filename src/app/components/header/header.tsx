"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import { useEffect, useState } from "react";
import ToggleTheme from "../buttons/toggleTheme";
import Logo from "./logo";
import Navigation from "./navigation";
import NavMobile from "./navMobile";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 bg-background/60 backdrop-blur-sm shadow-md dark:shadow-primary/20 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Logo />
      {isMobile ? (
        <NavMobile />
      ) : (
        <>
          <Navigation />
          <ToggleTheme />
        </>
      )}
    </header>
  );
}
