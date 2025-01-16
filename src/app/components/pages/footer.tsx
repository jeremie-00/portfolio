"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "../buttons/buttons";
import SpeedParticles from "../buttons/speedParticles";

export default function Footer() {
  const path = usePathname();
  return (
    <footer className="relative w-full h-full flex flex-col items-center justify-center p-8 z-50 bg-background border-t border-primary  mt-24">
      <div className="w-full flex flex-1 items-center justify-center gap-8">
        <ul className="flex flex-col items-center gap-2">
          <li>
            <p className="text-foreground text-sm flex max-md:flex-col items-center justify-center gap-2">
              <span>
                © {new Date().getFullYear() + " "}
                Créé avec ❤️,
              </span>
              <span>du code 💻 et</span>
              <Image src="/next.svg" alt="Next.js" width={80} height={80} />
              <span>par Jérémie Hérault.</span>
            </p>
          </li>
          <li>
            <p className="text-foreground text-sm flex max-md:flex-col items-center justify-center gap-2">
              Hébergé sur Vercel !
            </p>
          </li>
          <li className="flex max-md:flex-col items-center justify-center gap-4">
            <span className="relative">
              <Button href="/pages/legal" theme="footer">
                Mentions légales
              </Button>
            </span>
            <span className="text-foreground max-md:hidden">|</span>
            <SpeedParticles />
          </li>
        </ul>
        <Button
          href={`${path}`}
          theme="icon"
          className="absolute max-md:-top-20 right-10 m-auto scroll-to-top"
        >
          <IoArrowUp className="text-primary" size={28} />
        </Button>
      </div>
    </footer>
  );
}
