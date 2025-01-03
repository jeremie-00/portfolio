"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type VariantType = "default" | "background" | "highlight";

type ActiveVariantType =
  | "active_default"
  | "active_background"
  | "active_highlight";

type ThemeContextType = {
  linkVariant: VariantType;
  activeLinkVariant: ActiveVariantType;
  themeVariantHeader: (variant: VariantType) => void;
};

// Contexte pour les variantes de thème
const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [linkVariant, setLinkVariant] = useState<VariantType>("default");
  const [activeLinkVariant, setActiveLinkVariant] =
    useState<ActiveVariantType>("active_default");

  // Récupérer les valeurs depuis localStorage (ou sessionStorage)
  useEffect(() => {
    const storedLinkVariant = localStorage.getItem("linkVariant");
    const storedActiveLinkVariant = localStorage.getItem("activeLinkVariant");

    if (storedLinkVariant) setLinkVariant(storedLinkVariant as VariantType);
    if (storedActiveLinkVariant)
      setActiveLinkVariant(storedActiveLinkVariant as ActiveVariantType);
  }, []);

  // Mettre à jour le localStorage lorsque les valeurs changent
  useEffect(() => {
    localStorage.setItem("linkVariant", linkVariant);
    localStorage.setItem("activeLinkVariant", activeLinkVariant);
  }, [linkVariant, activeLinkVariant]);

  const themeVariantHeader = (variant: VariantType) => {
    setLinkVariant(variant);
    setActiveLinkVariant(`active_${variant}`);
  };

  return (
    <ThemeContext.Provider
      value={{ linkVariant, activeLinkVariant, themeVariantHeader }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
