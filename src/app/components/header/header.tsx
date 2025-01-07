"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import ToggleTheme from "../buttons/toggleTheme";
import Logo from "./logo";
import Navigation from "./navigation";
import NavMobile from "./navMobile";

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-10 w-full flex items-center justify-between px-8 py-4 bg-background shadow shadow-primary">
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
