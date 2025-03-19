type Media = {
  url: string;
  alt: string;
};

export interface ProjetProps {
  id: string;
  title: string;
  shortDesc?: string;
  longDesc?: string;
  skills?: string[];
  links?: {
    id: string;
    title: string;
    url: string;
    target?: string;
  }[];
  image?: {
    cover?: Media;
    medias?: Media[];
  };
}

// Exemple de projets en dur (à remplacer par une requête à votre base de données plus tard)
const projets: ProjetProps[] = [
  {
    id: "1",
    title: "Kasa",
    shortDesc:
      "Créer le front-end d'une application de location immobilière avec Vite, React, et React Router, en respectant les maquettes fournies et en exploitant des données simulées.",
    longDesc:
      "Kasa, un leader du secteur, entreprend une refonte complète de son site anciennement développé en ASP.NET pour adopter une stack JavaScript moderne, avec React pour le front-end et Node.js pour le back-end. Ma mission consiste à lancer le projet React en respectant les maquettes Figma fournies par le designer Paul, tout en développant les composants et les routes nécessaires. Ce projet offre une opportunité précieuse de renforcer des compétences clés en développement web moderne, notamment la maîtrise de React, React Router, et l’utilisation de Sass pour le CSS, des technologies très prisées pour concevoir des applications interactives et performantes.",
    skills: [
      "React",
      "Sass",
      "Vite",
      "Figma",
      "Node.js",
      "JavaScript",
      "Github",
    ],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.github.io/kasa/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00/kasa.git",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-Kasa/Cover-Kasa-15-02-2025-1739605766362-8513-zP4qUDZ0WrvgM02DwKb2TvOIwAng5B.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-Kasa/Medias-Kasa-15-02-2025-1739605766849-2463-bh2nk49GSQaCH8pCnKVLnofGd0EtYW.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-Kasa/Medias-Kasa-15-02-2025-1739605766849-2606-UdsAEwlyuvalNeig1LONJ1fhLt7qJp.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-Kasa/Medias-Kasa-15-02-2025-1739605766849-2652-RZ81wa1TUCyIhhQuCuhZykCL6wUwr4.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-Kasa/Medias-Kasa-15-02-2025-1739605766849-5474-1ldl77pxHf6kU49clFmHZqMA1F4k8S.webp",
          alt: "Image du projet",
        },
      ],
    },
  },
  {
    id: "2",
    title: "OhMyFood",
    shortDesc:
      "Développer une interface mobile-first pour une start-up, en utilisant Sass, des animations CSS et Git/GitHub pour la gestion de version. L'intégration se fera à partir des maquettes et du prototype Figma pour créer un site réactif.",
    longDesc:
      "Je suis développeur junior chez OhMyFood, une startup qui se développe à Paris après New-York. Ma mission est de créer un site 'mobile first' pour répertorier les menus de restaurants gastronomiques, où les clients peuvent composer leur repas à l'avance. Le site sera responsive et commencera avec 4 menus pour 4 restaurateurs. J'ai reçu les maquettes mobile et desktop, le prototype Figma, ainsi que les fichiers sources (images et textes). Je vais utiliser SASS pour organiser le CSS et intégrer des animations, tout en expliquant leur fonctionnement.",
    skills: ["HTML", "Sass", "CSS", "Figma", "Github"],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.github.io/OC-OhMyFood_P4/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00/OC-OhMyFood_P4.git",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-OhMyFood/Medias-OhMyFood-15-02-2025-1739602033820-70-eMcWOvSwIarXpLQWHZJbufFiU5qeA8.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-OhMyFood/Medias-OhMyFood-15-02-2025-1739601867877-2731-zOLX3vRqlnLjyeqGTisWSUDl3wBA7J.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-OhMyFood/Medias-OhMyFood-15-02-2025-1739602033820-1551-f2lhNbwESdUFibhQOtglkvq78kGArE.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/Portfolio-jh-tech/projet-OhMyFood/Medias-OhMyFood-15-02-2025-1739602033820-3883-qrdoL2lVDqBGAZxv3Z2q9tuUtYw90S.png",
          alt: "Image du projet",
        },
      ],
    },
  },
  {
    id: "3",
    title: "Booki",
    shortDesc:
      "Créez une page d'accueil responsive pour une agence de voyage en HTML et CSS. L'intégration se fera à partir des maquettes Figma (mobile, tablette, desktop), intégrez et stylisez les composants pour respecter le design.",
    longDesc:
      "Je suis développeur junior chez Booki, une start-up en pleine expansion qui facilite la recherche d’hébergements et d’activités touristiques. Ma mission est de créer un site responsive et accessible qui permet aux utilisateurs de trouver des logements et des activités dans la destination de leur choix. Pour ce projet, j’ai reçu les maquettes mobile et desktop, accompagnées d’un prototype Figma détaillant les interactions et les styles. Les ressources nécessaires, comme les images et les textes, ont également été fournies. J’utilise HTML5 et CSS3, en respectant une approche mobile first pour garantir une expérience optimale sur tous les appareils. Pour structurer le CSS, je m’appuie sur des outils modernes comme Flexbox et CSS Grid. De plus, j’intègre des animations et transitions subtiles pour améliorer l’expérience utilisateur et rendre l’interface plus vivante.",
    skills: ["HTML", "CSS", "Figma"],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.github.io/booki/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00/booki.git",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "/booki/Booki@3x.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "/booki/booki-medias-1.png",
          alt: "Image du projet",
        },
        {
          url: "/booki/booki-medias-2.png",
          alt: "Image du projet",
        },
      ],
    },
  },
];

// Fonction pour récupérer tous les projets
export const getProjets = async (): Promise<ProjetProps[]> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    setTimeout(() => resolve(projets), 100); // Simule une latence
  });
};

// Fonction pour récupérer un projet spécifique
export const getProjetById = async (
  id: string
): Promise<ProjetProps | null> => {
  const projets = await getProjets();
  const projet = projets.find((projet) => projet.id === id) ?? null;
  return new Promise((resolve) => {
    setTimeout(() => resolve(projet), 100); // Simule une latence
  });
};
