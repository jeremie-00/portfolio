"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullAvatar } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";
import { imageDelete, imageUpload } from "./image.actions";

const uploadImage = async (image: File, folder: string) => {
  return await imageUpload({
    title: "profil-about",
    file: image,
    folder: folder,
  });
};

export const getAvatar = async (): Promise<FullAvatar[]> => {
  return prisma.avatar.findMany({
    include: { recto: true, verso: true },
  });
};

export const getAvatarById = async (id: string): Promise<FullAvatar | null> => {
  return prisma.avatar.findUnique({
    where: {
      id: id,
    },
    include: { recto: true, verso: true },
  });
};
export const getAvatarByPage = async (
  page: string
): Promise<FullAvatar | null> => {
  return prisma.avatar.findUnique({
    where: {
      page: page,
    },
    include: { recto: true, verso: true },
  });
};

enum ArrowBullPosition {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
  middleTopLeft = "middleTopLeft",
  middleTopRight = "middleTopRight",
  middleBottomLeft = "middleBottomLeft",
  middleBottomRight = "middleBottomRight",
}

const avatarSchemaCreate = zfd.formData({
  page: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  text: z.string().nonempty({ message: "Vous devez fournir un texte" }),
  recto: z.instanceof(File).optional(),
  verso: z.instanceof(File).optional(),
  arrowBullPosition: z.nativeEnum(ArrowBullPosition),
});

export const createAvatar = authActionClient
  .schema(avatarSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { page, text, recto, verso, arrowBullPosition } = formData;

      const existingAvatar = await getAvatarByPage(page);
      if (existingAvatar) {
        return {
          success: false,
          status: "warn",
          message: `L'avatar page ${page} existe déjà.`,
        };
      }

      if (!text) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un texte.`,
        };
      }

      const urlRecto =
        recto && recto?.size > 0 && (await uploadImage(recto, "avatar"));

      const urlVerso =
        verso && verso?.size > 0 && (await uploadImage(verso, "avatar"));

      await prisma.avatar.create({
        data: {
          page: page,
          text: text,
          recto: urlRecto
            ? {
                create: {
                  url: urlRecto,
                  alt: "Memoji de profil de l'utilisateur",
                },
              }
            : undefined,
          verso: urlVerso
            ? {
                create: {
                  url: urlVerso,
                  alt: "Memoji de profil de l'utilisateur",
                },
              }
            : undefined,
          arrowBullPosition: arrowBullPosition,
        },
      });

      return {
        success: true,
        status: "success",
        message: `L'avatar page ${page} a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: `Erreur lors de la création de l'avatar.`,
      };
    }
  }) as (formData: FormData) => Promise<Result>;

const AvatarSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  page: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  text: z.string().nonempty({ message: "Vous devez fournir un texte" }),
  recto: z.instanceof(File).optional(),
  verso: z.instanceof(File).optional(),
  arrowBullPosition: z.nativeEnum(ArrowBullPosition),
});

export const updateAvatar = authActionClient
  .schema(AvatarSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, page, text, recto, verso, arrowBullPosition } = formData;

      const existingAvatar = await getAvatarById(id);

      if (!existingAvatar) {
        return {
          success: false,
          status: "warn",
          message: "Avatar introuvable.",
        };
      }

      const urlRecto =
        recto && recto?.size > 0 && (await uploadImage(recto, "avatar"));

      const urlVerso =
        verso && verso?.size > 0 && (await uploadImage(verso, "avatar"));

      if (existingAvatar?.recto && urlRecto)
        await imageDelete({ image: existingAvatar.recto });

      if (existingAvatar?.verso && urlVerso)
        await imageDelete({ image: existingAvatar.verso });

      if (!text) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un texte.`,
        };
      }

      await prisma.avatar.update({
        where: {
          id: id,
        },
        data: {
          page: page,
          text: text,
          arrowBullPosition: arrowBullPosition,
          recto: urlRecto
            ? {
                upsert: {
                  update: {
                    url: urlRecto,
                    alt: `Memoji de profil de l'utilisateur`,
                  },
                  create: {
                    url: urlRecto,
                    alt: `Memoji de profil de l'utilisateur`,
                  },
                },
              }
            : undefined,
          verso: urlVerso
            ? {
                upsert: {
                  update: {
                    url: urlVerso,
                    alt: `Memoji de profil de l'utilisateur`,
                  },
                  create: {
                    url: urlVerso,
                    alt: `Memoji de profil de l'utilisateur`,
                  },
                },
              }
            : undefined,
        },
      });

      return {
        success: true,
        status: "success",
        message: `L"avatar page ${page} a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour de l'avatar.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

export const deleteAvatar = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteAvatar = await getAvatarById(id);
      if (!deleteAvatar) {
        return {
          success: false,
          status: "warn",
          message: "Avatar introuvable.",
        };
      }
      await prisma.avatar.delete({
        where: {
          id: id,
        },
      });

      return {
        success: true,
        status: "success",
        message: `L'avatar a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression de l'avatar.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result>;
