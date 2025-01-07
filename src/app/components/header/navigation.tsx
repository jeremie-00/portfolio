"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const nav = [
  { href: "/", title: "Accueil" },
  { href: "/pages/1", title: "Mon parcours" },
  { href: "/pages/2", title: "Mes technologies favorites" },
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
              <Link
                href={item.href}
                className={`w-fit hover:text-primary after:content-[''] after:bg-primary after:transition-scale after:duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:origin-center after:scale-0  ${
                  isActive
                    ? "after:scale-100 text-primary"
                    : "hover:after:scale-100"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
