"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullLink } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";

export const getNavLinks = async (): Promise<FullLink[]> => {
  return await prisma.link.findMany({
    orderBy: {
      order: "asc",
    },
  });
};

export const getNavLinksExceptLegal = async (): Promise<FullLink[]> => {
  return await prisma.link.findMany({
    where: {
      page: {
        not: "legal",
      },
    },
    orderBy: {
      order: "asc",
    },
  });
};

export const getNavLinksById = async (id: string) => {
  return await prisma.link.findUnique({
    where: {
      id: id,
    },
  });
};
export const getNavLinksByPage = async (page: string) => {
  return await prisma.link.findUnique({
    where: {
      page: page,
    },
  });
};

const navigationSchemaCreate = zfd.formData({
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),

  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
});

export const createNavigation = authActionClient
  .schema(navigationSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { page, href, title, order } = formData;

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      await prisma.link.create({
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
        },
      });

      return {
        success: true,
        status: "success",
        message: `La navigation a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création de la navigation.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

const navigationSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
});

export const updateNavigation = authActionClient
  .schema(navigationSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, page, href, title, order } = formData;

      const existingNavigation = await getNavLinksById(id);

      if (!existingNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Navigation introuvable.",
        };
      }

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      await prisma.link.update({
        where: {
          id: id,
        },
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
        },
      });

      return {
        success: true,
        status: "success",
        message: `La navigation a été mise à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour de la navigation.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

export const deleteNavigation = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteNavigation = await getNavLinksById(id);
      if (!deleteNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Navigation introuvable.",
        };
      }
      await prisma.link.delete({
        where: {
          id: id,
        },
      });

      return {
        success: true,
        status: "success",
        message: `La navigation a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression de la navigation.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result>;
