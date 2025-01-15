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
    title: "Projet 1",
    shortDesc: "Description courte",
    longDesc: "Description longue",
    skills: ["React", "Next.js", "Tailwind"],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.vercel.app/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/cover/1734620324339-3288-Bmotfp5waOrVlFpdQc1lP7UwaScPhq.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1731767675720-2700-Mow2I35DmRKyzXfExqmuLTj9sjavEs.png",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735207800676-7480-M09gjljZfQ8s1g3xxFznwDevx1lNqn.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1731767675720-2700-Mow2I35DmRKyzXfExqmuLTj9sjavEs.png",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
      ],
    },
  },
  {
    id: "2",
    title: "Projet 2",
    shortDesc: "Description courte",
    longDesc:
      "Description longue  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    skills: ["React", "Next.js", "Tailwind"],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.vercel.app/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/cover/1734695299358-9490-c2wumS5aWBTPAkYm7ZtYvxj0PFpTjP.svg",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1731767675720-2700-Mow2I35DmRKyzXfExqmuLTj9sjavEs.png",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
      ],
    },
  },
  {
    id: "3",
    title: "Projet 3",
    shortDesc: "Description courte",
    longDesc: "Description longue",
    skills: ["React", "Next.js", "Tailwind"],
    links: [
      {
        id: "1",
        title: "Site web",
        url: "https://jeremie-00.vercel.app/",
        target: "_blank",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com/jeremie-00",
        target: "_blank",
      },
    ],
    image: {
      cover: {
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/cover/1734620324339-3288-Bmotfp5waOrVlFpdQc1lP7UwaScPhq.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1731767675720-2700-Mow2I35DmRKyzXfExqmuLTj9sjavEs.png",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735207800676-7480-M09gjljZfQ8s1g3xxFznwDevx1lNqn.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1731767675720-2700-Mow2I35DmRKyzXfExqmuLTj9sjavEs.png",
          alt: "Image de couverture du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1734584649309-8569-KgYhT73MGvLz0zDJaYIJUfTCaPyBJj.webp",
          alt: "Image de couverture du projet",
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
