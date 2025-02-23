"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullProjet } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";
import { imageDelete, imageUpload } from "./image.actions";

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
