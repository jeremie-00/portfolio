"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import ToggleTheme from "../buttons/toggleTheme";
import { nav } from "./navigation";

export default function NavMobile() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav>
      <button onClick={toggleMenu} className="text-2xl place-self-end">
        {!isMenuOpen && <CgMenuRight className="size-[1.8rem]" />}
      </button>
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed top-0 right-0 h-full w-[280px] bg-background shadow shadow-primary border-l-2 border-primary/40 p-4 flex flex-col items-start justify-start gap-4 rounded-l-lg z-50"
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              mass: 0.4,
              duration: 2,
            }}
          >
            <button onClick={toggleMenu} className="text-2xl self-end">
              <FiX />
            </button>
            <ul className="flex flex-col items-start gap-6">
              {nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.title}
                    className={`w-fit text-foreground  py-1 px-2 rounded-md ${
                      isActive ? "bg-primary/20" : "hover:bg-primary/20"
                    }`}
                  >
                    <Link onClick={toggleMenu} href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4">
              <ToggleTheme />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
