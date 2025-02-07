"use client";
import { getNavLinksExceptLegal } from "@/app/services/navigation.actions";
import { FullLink } from "@/app/types/prismaType";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { Button } from "../buttons/buttons";
import ToggleTheme from "../buttons/toggleTheme";

export default function NavMobile() {
  const pathname = usePathname();
  const [navLinks, setNavLinks] = useState<FullLink[]>([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const data = await getNavLinksExceptLegal();
      setNavLinks(data);
    };
    fetchNavLinks();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    if (isMenuOpen && !isVisible) {
      setIsMenuOpen(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, isVisible]);

  return (
    <>
      <div>
        {!isMenuOpen && (
          <Button
            onClick={toggleMenu}
            theme="icon"
            className="text-2xl place-self-end border border-border rounded-md rounded-tr-2xl p-2"
            ariaLabel="Menu"
          >
            <CgMenu className="size-[1.8rem]" />
          </Button>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="absolute top-0 z-10 right-0 w-[280px]"
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div className="bg-background border border-border/20 border-r-0 rounded-l-lg p-4 flex flex-col items-start justify-start gap-16 h-screen">
              <div className="w-full flex items-center justify-between">
                <ToggleTheme />
                <Button
                  onClick={toggleMenu}
                  theme="icon"
                  ariaLabel="Fermer le menu"
                >
                  <FiX className="size-[1.5rem]" />
                </Button>
              </div>
              <nav>
                <ul className="flex flex-col items-start gap-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.title}>
                        <Button
                          onClick={toggleMenu}
                          href={link.href}
                          isActive={isActive}
                          theme="highlight"
                          ariaLabel={`Aller à la page ${link.title}`}
                        >
                          {link.title}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
