"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import { headerLinkVariants, headerVariants } from "@/app/utils/HeaderVariant";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import ToggleTheme from "../../buttons/toggleTheme";
import { HeaderButton } from "./buttonThemeHeader";
import { useTheme } from "./headerProvider";

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
          <div className="max-xl:w-full flex items-center max-xl:justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={links[0].image?.url || "../../default.svg"}
                alt={links[0].image?.alt || "Image par défaut"}
                width={150}
                height={150}
                className="w-8 h-8"
                priority
              />
            </Link>
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
                  {!isMenuOpen && <FiMenu className="size-[1.8rem]" />}
                </button>
                {isMenuOpen && (
                  <div className="absolute w-max top-0 right-0 flex flex-col items-start justify-end gap-4 p-4 rounded-lg bg-background">
                    <button
                      onClick={toggleMenu}
                      className="text-2xl place-self-end"
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
                  </div>
                )}
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
          <Link href="/" className="flex items-center">
            <Image
              src={links[0].image?.url || "../../default.svg"}
              alt={links[0].image?.alt || "Image par défaut"}
              width={150}
              height={150}
              className="w-12 h-12"
            />
          </Link>
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
