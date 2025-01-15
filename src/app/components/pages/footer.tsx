"use client";
import Image from "next/image";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "../buttons/buttons";
import SpeedParticles from "../buttons/speedParticles";

export default function Footer() {
  return (
    <footer className="relative w-full h-full flex flex-col items-center justify-center p-8 z-50 bg-background border-t border-primary  mt-24">
      <div className="w-full flex flex-1 items-center justify-center gap-8">
        <ul className="flex flex-col items-center gap-2">
          <li></li>
          <li>
            <p className="text-foreground text-sm flex gap-2">
              © {new Date().getFullYear() + " "}
              Créé avec ❤️, du code 💻 et
              <Image src="/next.svg" alt="Next.js" width={80} height={80} />
              par Jérémie Hérault. Hébergé sur
              <Image
                src="/vercel.svg"
                alt="Next.js"
                width={15}
                height={15}
              />{" "}
              Vercel !
            </p>
          </li>
          <li className="flex items-center gap-4">
            <span className="relative">
              <Button href="/pages/legal" theme="footer">
                Mentions légales
              </Button>
            </span>
            <span className="text-foreground">|</span>
            {/*  <span className="relative">
              <Button href="/pages/legal" theme="footer">
                Plan du site
              </Button>
            </span> */}

            <SpeedParticles />
          </li>
          {/*   <li>
            <SpeedParticles />
          </li> */}
        </ul>
        <Button
          href="/pages/legal"
          theme="icon"
          className="absolute bottom-[50%] right-10 m-auto scroll-to-top"
        >
          <IoArrowUp className="text-primary" size={28} />
        </Button>
      </div>
    </footer>
  );
}
