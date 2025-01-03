import { headerLinkVariants } from "@/app/utils/HeaderVariant";
import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { useTheme, VariantType } from "./headerProvider";

export const HeaderButton = ({
  themeVariantHeader,
}: {
  themeVariantHeader: (variant: VariantType) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const listeThemeVariantHeader = [
    "default",
    "background",
    "highlight",
  ] as VariantType[];

  const theme = useTheme();
  const { linkVariant, activeLinkVariant } = theme || {};

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        className="border-2 border-primary/20 rounded-lg p-2 transition-colors duration-300 hover:bg-primary/20 hover:text-primary"
        onClick={toggleMenu}
      >
        <IoSettings className="size-[1.5rem]" />
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="absolute bg-background top-16 right-0 z-10 rounded-lg shadow-lg">
          <ul className="flex flex-col gap-2 p-2 border-2 border-primary rounded-lg">
            {listeThemeVariantHeader.map((variant) => (
              <li
                key={variant}
                className={headerLinkVariants(
                  linkVariant === variant
                    ? { variant: activeLinkVariant }
                    : { variant }
                )}
                onClick={() => {
                  themeVariantHeader(variant);
                  setIsMenuOpen(false);
                }}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
