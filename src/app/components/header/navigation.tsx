"use client";
import { usePathname } from "next/navigation";
import { Button } from "../buttons/buttons";

export const nav = [
  { href: "/", title: "Accueil" },
  { href: "/pages/1", title: "Mon parcours" },
  { href: "/pages/2", title: "Mes Projets" },
  { href: "/pages/3", title: "Me contacter" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center gap-8">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.title} className="relative">
              <Button
                href={item.href}
                theme="underline"
                className={` ${
                  isActive
                    ? "after:scale-100 text-primary"
                    : "hover:after:scale-100"
                }`}
              >
                {item.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
