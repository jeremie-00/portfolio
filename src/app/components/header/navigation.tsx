"use client";
import { FullLink } from "@/app/types/prismaType";
import { usePathname } from "next/navigation";
import { Button } from "../buttons/buttons";

export default function Navigation({ links }: { links: FullLink[] }) {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;
          if (link.inNav) {
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
          }
        })}
      </ul>
    </nav>
  );
}
