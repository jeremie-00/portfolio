"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import { Prisma } from "@prisma/client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import ToggleTheme from "../../buttons/toggleTheme";
import { HeaderButton } from "./buttonThemeHeader";
import { useTheme } from "./headerProvider";
import { headerLinkVariants, headerVariants } from "./headerVariant";

export default function HeaderMultiPages({
  links,
  subLinks,
}: {
  links: Prisma.SectionGetPayload<{ include: { image: true } }>[];
  subLinks: Prisma.SectionGetPayload<{ include: { image: true } }>[];
}) {
  const params = useParams();
  const searchParams = useSearchParams();
  const subLinkParams = searchParams.get("sublink");
  const headerLinks = links.filter((link) => link.order === 1);
  const theme = useTheme();

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

  if (!theme) {
    throw new Error("useTheme doit être utilisé dans un HeaderProvider");
  }

  const { linkVariant, activeLinkVariant, themeVariantHeader } = theme;

  const isMobile = useIsMobile();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderLogo = () => {
    return (
      <Link href="/" className="flex items-center">
        <Image
          src={links[0].image?.url || "../../default.svg"}
          alt={links[0].image?.alt || "Image par défaut"}
          width={150}
          height={150}
          className="w-12 h-12"
        />
      </Link>
    );
  };

  const renderLinks = () => {
    return headerLinks.map((link) => {
      const relatedSubLinks = subLinks.filter(
        (subLink) => subLink.page === link.page
      );
      const isActive =
        Number(params.id) === link.page ||
        relatedSubLinks.some((subLink) => subLink.href === subLinkParams);
      return (
        <li
          key={link.id}
          className={headerLinkVariants({
            variant: isActive ? activeLinkVariant : linkVariant,
          })}
        >
          <Link href={`/pages/${link.page}`} onClick={toggleMenu}>
            {link.href}
          </Link>
          {relatedSubLinks.length > 0 && (
            <IoChevronDownOutline className="group-hover:rotate-180 transition-rotate duration-300" />
          )}
          {/* Sous-menu pour les sections */}
          {relatedSubLinks.length > 0 && (
            <ul className="z-10 hidden group-hover:block absolute top-full w-max right-0 bg-background p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {relatedSubLinks.map((subLink) => (
                <li key={subLink.id} className="p-2">
                  <Link
                    href={`/pages/${subLink.page}?sublink=${subLink.href}#${subLink.href}`}
                    onClick={toggleMenu}
                    className={headerLinkVariants({
                      variant:
                        subLink.href === subLinkParams
                          ? activeLinkVariant
                          : linkVariant,
                    })}
                  >
                    {subLink.href}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  if (isMobile)
    return (
      <header className={headerVariants({ variant: "sticky", size: "md" })}>
        <nav className={headerVariants({ nav: "default_nav" })}>
          <div className="max-xl:w-full flex items-center max-xl:justify-between gap-8">
            {/* Logo */}
            {renderLogo()}
            {isClient && (
              <div
                ref={menuRef}
                className="relative w-fit flex items-center justify-end gap-8"
              >
                {/* Icône du menu hamburger */}
                <button
                  onClick={toggleMenu}
                  className="text-2xl place-self-end"
                >
                  {!isMenuOpen && <CgMenuRight className="size-[1.8rem]" />}
                </button>
                <AnimatePresence initial={false}>
                  {isMenuOpen && (
                    <motion.div
                      className="fixed top-0 right-0 h-full w-[250px] bg-background shadow shadow-primary border-l-2 border-primary/40 p-4 flex flex-col items-start justify-start gap-4 rounded-l-lg z-50"
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
                      <button
                        onClick={toggleMenu}
                        className="text-2xl self-end"
                      >
                        <FiX />
                      </button>
                      <div className="flex flex-col items-start gap-4">
                        {renderLinks()}
                      </div>
                      <div className="flex items-center gap-4">
                        <ToggleTheme />
                        <HeaderButton themeVariantHeader={themeVariantHeader} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>
      </header>
    );

  return (
    <header
      className={headerVariants({
        variant: "sticky",
        size: "md",
      })}
    >
      <nav
        className={headerVariants({
          nav: "default_nav",
        })}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          {renderLogo()}
        </div>

        {/* Menu de navigation */}
        {isClient && (
          <>
            <ol className="flex items-center gap-4">{renderLinks()}</ol>
            <div className="flex max-lg:flex-col max-lg:gap-4 items-center justify-center gap-8">
              <ToggleTheme />
              <HeaderButton themeVariantHeader={themeVariantHeader} />
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
