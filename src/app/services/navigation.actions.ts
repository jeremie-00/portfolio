export interface NavLinksProps {
  href: string;
  title: string;
}

const nav: NavLinksProps[] = [
  { href: "/", title: "Accueil" },
  { href: "/pages/projet", title: "Mes Projets" },
  { href: "/pages/contact", title: "Me contacter" },
];

// Fonction pour récupérer tous les projets
export const getNavLinks = async (): Promise<NavLinksProps[]> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    setTimeout(() => resolve(nav), 100); // Simule une latence
  });
};
