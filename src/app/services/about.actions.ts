"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullAbout } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";
import { imageDelete, imageUpload } from "./image.actions";

export const getAbout = async (): Promise<FullAbout[]> => {
  return await prisma.about.findMany({
    orderBy: {
      order: "asc",
    },
    include: { image: true },
  });
};

export const getAboutById = async (id: string) => {
  return await prisma.about.findUnique({
    where: {
      id: id,
    },
    include: { image: true },
  });
};

const aboutSchemaCreate = zfd.formData({
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  text: z.string().nonempty({ message: "Vous devez fournir un texte" }),
  image: z.instanceof(File).optional(),
});

export const createAbout = authActionClient
  .schema(aboutSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { order, text, image } = formData;

      if (!order || !text) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un ordre, un type et un texte.`,
        };
      }

      const url =
        image && image?.size > 0
          ? await imageUpload({
              title: "profil-about",
              file: image,
              folder: "about",
            })
          : null;

      const createdAbout = await prisma.about.create({
        data: {
          order: Number(order),
          text: text,
          image: url
            ? {
                create: {
                  url: url,
                  alt: "Memoji de profil de l'utilisateur",
                },
              }
            : undefined,
        },
        include: {
          image: true,
        },
      });

      return {
        state: createdAbout,
        success: true,
        status: "success",
        message: `La bull a propos a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création de la bull a propos.",
      };
    }
  }) as (formData: FormData) => Promise<Result<FullAbout>>;

const AboutSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  text: z.string().nonempty({ message: "Vous devez fournir un texte" }),
  image: z.instanceof(File).optional(),
});

export const updateAbout = authActionClient
  .schema(AboutSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, order, text, image } = formData;

      const existingAbout = await getAboutById(id);

      if (!existingAbout) {
        return {
          success: false,
          status: "warn",
          message: "Compétence introuvable.",
        };
      }

      const url =
        image && image?.size > 0
          ? await imageUpload({
              title: "profil-about",
              file: image,
              folder: "about",
            })
          : undefined;

      if (existingAbout?.image && url)
        await imageDelete({ image: existingAbout.image });

      if (!order || !text) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un ordre, un type et un texte.`,
        };
      }

      const updatedAbout = await prisma.about.update({
        where: {
          id: id,
        },
        data: {
          order: Number(order),
          text: text,
          image: url
            ? {
                upsert: {
                  update: { url, alt: `Memoji de profil de l'utilisateur` },
                  create: { url, alt: `Memoji de profil de l'utilisateur` },
                },
              }
            : undefined,
        },
        include: {
          image: true,
        },
      });

      return {
        state: updatedAbout,
        success: true,
        status: "success",
        message: `La bull a propos a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour de la bull a propos.",
      };
    }
  }) as (formData: FormData) => Promise<Result<FullAbout>>;

export const deleteAbout = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteAbout = await getAboutById(id);
      if (!deleteAbout) {
        return {
          success: false,
          status: "warn",
          message: "Texte introuvable.",
        };
      }
      await prisma.about.delete({
        where: {
          id: id,
        },
      });

      return {
        state: deleteAbout,
        success: true,
        status: "success",
        message: `La bull a propos a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression de la bull a propos.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result<FullAbout>>;
