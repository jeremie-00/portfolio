"use client";
import { NavLinksProps, getNavLinks } from "@/app/services/navigation.actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../buttons/buttons";

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
                ariaLabel={`Aller à la page ${link.title}`}
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
