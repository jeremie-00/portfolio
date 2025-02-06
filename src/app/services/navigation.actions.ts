export interface NavLinksProps {
  page: string;
  href: string;
  title: string;
}

const nav: NavLinksProps[] = [
  { href: "/", title: "Accueil", page: "accueil" },
  { href: "/pages/projet", title: "Mes Projets", page: "projet" },
  { href: "/pages/contact", title: "Me contacter", page: "contact" },
  { href: "/login", title: "Connexion", page: "login" },
  { href: "/pages/legal", title: "Mention légale", page: "legal" },
];

// Fonction pour récupérer tous les projets
export const getNavLinks = async (): Promise<NavLinksProps[]> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    const filteredNav = nav.filter((link) => link.page !== "legal");
    resolve(filteredNav);
  });
};
