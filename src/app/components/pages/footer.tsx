"use client";
import { useLinks } from "@/app/dashboard/link/useLinks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "../buttons/buttons";
import SpeedParticles from "../buttons/speedParticles";

export default function Footer() {
  const path = usePathname();
  //const [navLink, setNavLink] = useState<FullLink | null>();

  /* const { state } = useGenericState(LinkContext); */
  //const { datas: links } = useLinkStore();
  const { datas: links } = useLinks();
  const legalLink = links.find((link) => link.page === "legal") || null;
  /*   useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const res = await fetch("/api/links");
        if (!res.ok) throw new Error("Erreur lors du chargement des liens");

        const links: FullLink[] = await res.json();
        // Filtre pour récupérer le lien "legal" ou le premier lien dispo
        const legalLink =
          links.find((link) => link.page === "legal") || links[0] || null;

        setNavLink(legalLink);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNavLinks();
  }, []); */

  /* useEffect(() => {
    const fetchNavLinks = async () => {
      const linkLegal = await getNavLinksByPage("legal");
      setNavLink(linkLegal);
    };
    fetchNavLinks();
  }, []); */
  return (
    <footer className="relative w-full h-full flex flex-col items-center justify-center p-8 z-40 bg-background border-t border-primary  mt-24">
      <div className="w-full flex flex-1 items-center justify-center gap-8">
        <ul className="flex flex-col items-center gap-2">
          <li>
            <p className="text-foreground text-sm flex max-md:flex-col items-center justify-center gap-2">
              <span>
                © {new Date().getFullYear() + " "}
                Créé avec ❤️,
              </span>
              <span>du code 💻 et</span>
              <Image
                src="/next.svg"
                alt="Next.js"
                width={80}
                height={80}
                className="w-16"
                loading="lazy"
              />
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
              <Button href={legalLink?.href} theme="footer">
                {legalLink?.title}
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
          ariaLabel="Retour au haut de la page"
        >
          <IoArrowUp className="text-primary" size={28} />
        </Button>
      </div>
    </footer>
  );
}
