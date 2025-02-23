"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullProjet, ProjetData } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";
import { imageDelete, imageUpload } from "./image.actions";

/* type Media = {
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
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/cover/1734620324339-3288-Bmotfp5waOrVlFpdQc1lP7UwaScPhq.png",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206634822-7535-9CwYygreflYxygCsBRARwQPay2uN8q.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206634822-5005-IoLOkUwncCbbLA1HaXuDnDfeyS4jzM.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206634822-1491-vPNZRujbYCgiMwPKdYAle6h0oeVKdK.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206634822-3235-Kvsa09BmUATHGQFjmUh6n5YlDNLnD1.webp",
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
        url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/cover/1734695299358-9490-c2wumS5aWBTPAkYm7ZtYvxj0PFpTjP.svg",
        alt: "Image de couverture du projet",
      },
      medias: [
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206923267-6081-ZBiEoluFNuzOzCAMOjOoBAFoxLSeto.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206923268-142-NEH4rrVqxPlBSFj311nxTsuhilq4OK.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206923268-1744-4xWLLKnNdMf64teopeu2uW0BLh0R4p.webp",
          alt: "Image du projet",
        },
        {
          url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/medias/1735206923268-3921-puBK9NG9jiTHCSzUTNeD1emktrPDdq.webp",
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
 */

export const getProjets = async (): Promise<FullProjet[]> => {
  return prisma.projet.findMany({
    include: { skills: true, links: true, cover: true, medias: true },
  });
};

export const getProjetById = async (id: string) => {
  return prisma.projet.findUnique({
    where: {
      id: id,
    },
    include: {
      skills: true,
      links: true,
      cover: true,
      medias: true,
    },
  });
};

const projetSchemaCreate = zfd.formData({
  //id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  title: z.string().nonempty("Vous devez fournir un titre"),
  shortDesc: z.string().nonempty("Vous devez fournir une description courte"),
  longDesc: z.string().nonempty("Vous devez fournir une description longue"),
  //links: z.array(z.string()).nonempty("Vous devez fournir des liens"),
  //medias: z.array(z.instanceof(File)).optional(),
  medias: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.instanceof(File)).optional()),
  cover: z.instanceof(File).optional(),
  skills: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.string()).optional()),
  links: zfd
    .text()
    .transform((val) => {
      if (!val) return []; // Si pas de valeur, retourne un tableau vide
      try {
        const parsed = JSON.parse(val);
        // Vérifie si c'est bien un tableau d'objets
        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          return []; // Si ce n'est pas un tableau, retourne un tableau vide
        }
      } catch {
        return []; // Retourne un tableau vide en cas d'erreur de parsing
      }
    })
    .pipe(
      z
        .array(
          z.object({
            id: z.string().optional(),
            href: z.string().min(1, "L'URL est requise"),
            title: z.string().min(1, "Le titre est requis"),
          })
        )
        .optional()
    ),
});

export const createProjet = authActionClient
  .schema(projetSchemaCreate)
  .action(async ({ parsedInput: { ...projet } }) => {
    try {
      const { title, shortDesc, longDesc, skills, cover, links, medias } =
        projet;
      console.log(projet);

      const url =
        cover && cover.size > 0
          ? await imageUpload({
              title: `Cover-${title}`,
              file: cover,
              folder: `projet-${title}`,
            })
          : null;

      const mediasUrls =
        medias && medias.length > 0
          ? await Promise.all(
              medias
                .filter(
                  (media): media is File =>
                    media !== undefined && media.size > 0
                )
                .map(async (media) => {
                  const res = await imageUpload({
                    title: `Medias-${title}`,
                    file: media,
                    folder: `projet-${title}`,
                  });
                  return res;
                })
            )
          : [];

      const createdProjet = await prisma.projet.create({
        data: {
          title,
          shortDesc,
          longDesc,
          skills: {
            connect: skills && skills.map((id) => ({ id })),
          },
          links: {
            create: links?.map((link, index) => ({
              page: `projet-${title}-${index}`,
              href: link.href,
              title: link.title,
              order: index + 1,
            })),
          },
          cover: url
            ? { create: { url, alt: `Image de ${title}` } }
            : undefined,
          medias: {
            create: mediasUrls
              ? mediasUrls
                  .filter((url) => url !== null)
                  .map((url) => ({
                    url: url,
                    alt: `Projet ${projet.title} capture d'écran`,
                  }))
              : undefined,
          },
        },
        include: { skills: true, links: true, cover: true },
      });

      return {
        state: createdProjet,
        success: true,
        status: "success",
        message: `Le projet \"${title}\" a été créé avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création du projet.",
      };
    }
  }) as unknown as (formData: FormData) => Promise<Result<FullProjet>>;

const projetSchemaCreated = z.object({
  //id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  title: z.string().nonempty("Vous devez fournir un titre"),
  shortDesc: z.string().nonempty("Vous devez fournir une description courte"),
  longDesc: z.string().nonempty("Vous devez fournir une description longue"),
  //links: z.array(z.string()).nonempty("Vous devez fournir des liens"),
  medias: z.array(z.instanceof(File).optional()),
  cover: z.instanceof(File).optional(),
  skills: z.array(z.string()).optional(),
  links: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string(),
      title: z.string(),
    })
  ),
});

export const createProjetd = authActionClient
  .schema(projetSchemaCreated)
  .action(async ({ parsedInput: { ...projet } }) => {
    try {
      const { title, shortDesc, longDesc, skills, cover, links, medias } =
        projet;
      console.log(medias);

      const url =
        cover && cover.size > 0
          ? await imageUpload({
              title: `Cover-${title}`,
              file: cover,
              folder: `projet-${title}`,
            })
          : null;

      const mediasUrls =
        medias && medias.length > 0
          ? await Promise.all(
              medias
                .filter(
                  (media): media is File =>
                    media !== undefined && media.size > 0
                )
                .map(async (media) => {
                  const res = await imageUpload({
                    title: `Medias-${title}`,
                    file: media,
                    folder: `projet-${title}`,
                  });
                  return res;
                })
            )
          : [];

      const createdProjet = await prisma.projet.create({
        data: {
          title,
          shortDesc,
          longDesc,
          skills: {
            connect: skills && skills.map((id) => ({ id })),
          },
          links: {
            create: links?.map((link, index) => ({
              page: `projet-${title}-${index}`,
              href: link.url,
              title: link.title,
              order: index + 1,
            })),
          },
          cover: url
            ? { create: { url, alt: `Image de ${title}` } }
            : undefined,
          medias: {
            create: mediasUrls
              ? mediasUrls
                  .filter((url) => url !== null)
                  .map((url) => ({
                    url: url,
                    alt: `Projet ${projet.title} capture d'écran`,
                  }))
              : undefined,
          },
        },
        include: { skills: true, links: true, cover: true },
      });

      return {
        state: createdProjet,
        success: true,
        status: "success",
        message: `Le projet \"${title}\" a été créé avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création du projet.",
      };
    }
  }) as unknown as (projet: ProjetData) => Promise<Result<FullProjet>>;

const projetSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  title: z.string().nonempty("Vous devez fournir un titre"),
  shortDesc: z.string().nonempty("Vous devez fournir une description courte"),
  longDesc: z.string().nonempty("Vous devez fournir une description longue"),
  //medias: z.array(z.instanceof(File)).optional(),
  medias: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.instanceof(File)).optional()),
  medias_update: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.string()).optional()),

  cover: z.instanceof(File).optional(),
  skills: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.string()).optional()),
  links: zfd
    .text()
    .transform((val) => {
      if (!val) return []; // Si pas de valeur, retourne un tableau vide
      try {
        const parsed = JSON.parse(val);
        // Vérifie si c'est bien un tableau d'objets
        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          return []; // Si ce n'est pas un tableau, retourne un tableau vide
        }
      } catch {
        return []; // Retourne un tableau vide en cas d'erreur de parsing
      }
    })
    .pipe(
      z
        .array(
          z.object({
            id: z.string().optional(),
            href: z.string().min(1, "L'URL est requise"),
            title: z.string().min(1, "Le titre est requis"),
          })
        )
        .optional()
    ),
});

export const updateProjet = authActionClient
  .schema(projetSchemaUpdate)
  .action(async ({ parsedInput: { ...projet } }) => {
    try {
      const {
        id,
        title,
        shortDesc,
        longDesc,
        skills,
        cover,
        links,
        medias,
        medias_update,
      } = projet;

      const existingProjet = await getProjetById(id);

      if (!existingProjet) {
        return {
          success: false,
          status: "warn",
          message: "Projet introuvable.",
        };
      }

      const url =
        cover && cover?.size > 0
          ? await imageUpload({
              title: `Cover-${title}`,
              file: cover,
              folder: `projet-${title}`,
            })
          : undefined;

      if (existingProjet?.cover && url)
        await imageDelete({ image: existingProjet.cover });

      // 1. Supprimer les médias existants qui ne sont plus dans mediasUpdate
      const mediasToDelete = existingProjet.medias.filter((media) =>
        medias_update?.includes(media.url)
      );

      await Promise.all(
        mediasToDelete.map(async (media) => {
          await imageDelete({ image: media });
          //await prisma.media.delete({ where: { id: media.id } });
        })
      );

      // 2. Ajouter de nouveaux médias
      const mediasUrls =
        medias && medias.length > 0
          ? await Promise.all(
              medias
                .filter(
                  (media): media is File =>
                    media !== undefined && media.size > 0
                )
                .map(async (media) => {
                  const res = await imageUpload({
                    title: `Medias-${title}`,
                    file: media,
                    folder: `projet-${title}`,
                  });
                  return res;
                })
            )
          : [];

      // Filtrer les URL valides
      const validMediasUrls = mediasUrls.filter(
        (url) => url !== null
      ) as string[];

      const existingSkills = existingProjet?.skills.map((skill) => skill.id);
      const skillDisconnect = existingSkills?.filter(
        (skillId) => !skills?.includes(skillId)
      );

      const updatedProjet = await prisma.projet.update({
        where: { id },
        data: {
          title,
          shortDesc,
          longDesc,
          skills: {
            connect: skills && skills.map((id) => ({ id })),
            disconnect: skillDisconnect?.map((id) => ({ id })),
          },
          links: {
            upsert: links?.map((link, index) => ({
              where: { id: link.id },
              update: {
                page: `projet-${title}-${index}`,
                href: link.href,
                title: link.title,
                order: index + 1,
                inNav: false,
              },
              create: {
                page: `projet-${title}-${index}`,
                href: link.href,
                title: link.title,
                order: index + 1,
                inNav: false,
              },
            })),
          },
          medias: {
            upsert: validMediasUrls
              ? validMediasUrls
                  .filter((url) => url !== null)
                  .map((url) => ({
                    where: { url: url },
                    update: {
                      url: url,
                      alt: `Projet ${title} capture d'écran`,
                    },
                    create: {
                      url: url,
                      alt: `Projet ${title} capture d'écran`,
                    },
                  }))
              : undefined,
          },
          cover: url
            ? {
                upsert: {
                  update: { url, alt: `Image de ${title}` },
                  create: { url, alt: `Image de ${title}` },
                },
              }
            : undefined,
        },
        include: { skills: true, links: true, cover: true, medias: true },
      });

      return {
        state: updatedProjet,
        success: true,
        status: "success",
        message: `Le projet \"${title}\" a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du projet.",
      };
    }
  }) as unknown as (formData: FormData) => Promise<Result<FullProjet>>;

const projetSchemaUpdated = z.object({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  title: z.string().nonempty("Vous devez fournir un titre"),
  shortDesc: z.string().nonempty("Vous devez fournir une description courte"),
  longDesc: z.string().nonempty("Vous devez fournir une description longue"),
  //links: z.array(z.string()).nonempty("Vous devez fournir des liens"),
  medias: z.array(z.instanceof(File).optional()),
  mediasUpdate: z.array(z.string()).optional(),
  cover: z.instanceof(File).optional(),
  skills: z.array(z.string()).optional(),
  links: z.array(
    // Modifié ici pour accepter un tableau d'objets
    z.object({
      id: z.string().optional(),
      url: z.string(),
      title: z.string(),
    })
  ),
});

export const updateProjetd = authActionClient
  .schema(projetSchemaUpdated)
  .action(async ({ parsedInput: { ...projet } }) => {
    try {
      const {
        id,
        title,
        shortDesc,
        longDesc,
        skills,
        cover,
        links,
        medias,
        mediasUpdate,
      } = projet;

      const existingProjet = await getProjetById(id);

      if (!existingProjet) {
        return {
          success: false,
          status: "warn",
          message: "Projet introuvable.",
        };
      }

      const url =
        cover && cover?.size > 0
          ? await imageUpload({
              title: `Cover-${title}`,
              file: cover,
              folder: `projet-${title}`,
            })
          : undefined;

      if (existingProjet?.cover && url)
        await imageDelete({ image: existingProjet.cover });

      // 1. Supprimer les médias existants qui ne sont plus dans mediasUpdate
      const mediasToDelete = existingProjet.medias.filter((media) =>
        mediasUpdate?.includes(media.url)
      );

      await Promise.all(
        mediasToDelete.map(async (media) => {
          await imageDelete({ image: media });
          //await prisma.media.delete({ where: { id: media.id } });
        })
      );

      // 2. Ajouter de nouveaux médias
      const mediasUrls =
        medias && medias.length > 0
          ? await Promise.all(
              medias
                .filter(
                  (media): media is File =>
                    media !== undefined && media.size > 0
                )
                .map(async (media) => {
                  const res = await imageUpload({
                    title: `Medias-${title}`,
                    file: media,
                    folder: `projet-${title}`,
                  });
                  return res;
                })
            )
          : [];

      // Filtrer les URL valides
      const validMediasUrls = mediasUrls.filter(
        (url) => url !== null
      ) as string[];

      const existingSkills = existingProjet?.skills.map((skill) => skill.id);
      const skillDisconnect = existingSkills?.filter(
        (skillId) => !skills?.includes(skillId)
      );

      const updatedProjet = await prisma.projet.update({
        where: { id },
        data: {
          title,
          shortDesc,
          longDesc,
          skills: {
            connect: skills && skills.map((id) => ({ id })),
            disconnect: skillDisconnect?.map((id) => ({ id })),
          },
          links: {
            upsert: links?.map((link, index) => ({
              where: { id: link.id },
              update: {
                page: `projet-${title}-${index}`,
                href: link.url,
                title: link.title,
                order: index + 1,
                inNav: false,
              },
              create: {
                page: `projet-${title}-${index}`,
                href: link.url,
                title: link.title,
                order: index + 1,
                inNav: false,
              },
            })),
          },
          medias: {
            upsert: validMediasUrls
              ? validMediasUrls
                  .filter((url) => url !== null)
                  .map((url) => ({
                    where: { url: url },
                    update: {
                      url: url,
                      alt: `Projet ${title} capture d'écran`,
                    },
                    create: {
                      url: url,
                      alt: `Projet ${title} capture d'écran`,
                    },
                  }))
              : undefined,
          },
          cover: url
            ? {
                upsert: {
                  update: { url, alt: `Image de ${title}` },
                  create: { url, alt: `Image de ${title}` },
                },
              }
            : undefined,
        },
        include: { skills: true, links: true, cover: true, medias: true },
      });

      return {
        state: updatedProjet,
        success: true,
        status: "success",
        message: `Le projet \"${title}\" a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du projet.",
      };
    }
  }) as unknown as (projet: ProjetData) => Promise<Result<FullProjet>>;

export const deleteProjet = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const projet = await getProjetById(id);
      if (!projet) {
        return {
          success: false,
          status: "warn",
          message: "Projet introuvable.",
        };
      }

      if (projet.cover) await imageDelete({ image: projet.cover });

      if (projet.medias)
        await Promise.all(
          projet.medias.map((media) => imageDelete({ image: media }))
        );

      await prisma.projet.delete({
        where: { id: id },
        include: { links: true },
      });

      return {
        state: projet,
        success: true,
        status: "success",
        message: `Le projet \"${projet.title}\" a été supprimé avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression du projet.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result<FullProjet>>;
