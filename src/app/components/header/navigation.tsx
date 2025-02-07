"use client";
import { getNavLinksExceptLegal } from "@/app/services/navigation.actions";
import { FullLink } from "@/app/types/prismaType";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../buttons/buttons";

export default function Navigation() {
  const pathname = usePathname();
  const [navLinks, setNavLinks] = useState<FullLink[]>([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const data = await getNavLinksExceptLegal();
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
