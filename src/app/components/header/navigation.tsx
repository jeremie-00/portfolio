"use client";
import { usePathname } from "next/navigation";
import { Button } from "../buttons/buttons";
import { NavLinksProps, getNavLinks } from "@/app/services/navigation.actions";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [navLinks, setNavLinks] = useState<NavLinksProps[]>([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const data = await getNavLinks();
      setNavLinks(data);
    };
    fetchNavLinks();
  }, []);

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.title} className="relative">
              <Button
                href={link.href}
                theme="underline"
                className={` ${
                  isActive
                    ? "after:scale-100 text-primary"
                    : "hover:after:scale-100"
                }`}
              >
                {link.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
