"use client";
import { useIsMobile } from "@/app/hooks/useMobile";

import { useLinks } from "@/app/dashboard/link/useLinks";
import { useEffect, useState } from "react";
import ToggleTheme from "../buttons/toggleTheme";
import Logo from "./logo";
import Navigation from "./navigation";
import NavMobile from "./navMobile";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();

  /* const { state } = useGenericState(LinkContext); */
  const { datas: links } = useLinks();

  /*   useEffect(() => {
    setLinks(initialData); // Hydrate le store au chargement
  }, [initialData, setLinks]); */
  //const [navLinks, setNavLinks] = useState<FullLink[]>([]);

  /* useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const res = await fetch("/api/nav-links");
        if (!res.ok) throw new Error("Erreur lors du chargement des liens");

        const links: FullLink[] = await res.json();
        // Filtre pour récupérer le lien "legal" ou le premier lien dispo

        setNavLinks(links);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNavLinks();
  }, []); */

  /*   useEffect(() => {
    const fetchNavLinks = async () => {
      const data = await getNavLinks();
      setNavLinks(data);
    };
    fetchNavLinks();
  }, []);
 */
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
      className={`sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 bg-background/60 backdrop-blur-sm shadow-custom transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Logo />
      {isMobile ? (
        <NavMobile links={links} />
      ) : (
        <>
          <Navigation links={links} />
          <ToggleTheme />
        </>
      )}
    </header>
  );
}
