"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { deleteSchema } from "../types/zodType";

export const getTextNotation = async () => {
  return await prisma.textNotation.findMany({
    orderBy: {
      order: "asc",
    },
  });
};

export const getTextNotationById = async (id: string) => {
  return await prisma.textNotation.findUnique({
    where: {
      id: id,
    },
  });
};

export const getTextNotationByPage = async (path: string) => {
  const page =
    path === "/" ? "accueil" : path.startsWith("/") ? path.substring(1) : path;

  if (page) {
    return await prisma.textNotation.findMany({
      where: {
        page: page,
      },
      orderBy: {
        order: "asc",
      },
    });
  }
};

const notationSchemaCreate = zfd.formData({
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  type: z.string(),
  textNotation: z.string(),
  text: z.string(),
});

export const createTextNotation = authActionClient
  .schema(notationSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { page, order, type, textNotation, text } = formData;

      if (!page || !type || !order || (!textNotation && !text)) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un ordre, un type et un texte.`,
        };
      }

      await prisma.textNotation.create({
        data: {
          page: page,
          order: Number(order),
          type: type,
          textNotation: textNotation,
          text: text,
        },
      });

      return {
        success: true,
        status: "success",
        message: `Le texte a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du texte.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

const notationSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
  type: z.string(),
  textNotation: z.string(),
  text: z.string(),
});

export const updateTextNotation = authActionClient
  .schema(notationSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, page, order, type, textNotation, text } = formData;

      const existingTextNotation = await getTextNotationById(id);
      if (!existingTextNotation) {
        return {
          success: false,
          status: "warn",
          message: "Texte introuvable.",
        };
      }

      if (!order || !type || (!textNotation && !text)) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un ordre, un type et un texte.`,
        };
      }

      await prisma.textNotation.update({
        where: {
          id: id,
        },
        data: {
          page: page,
          order: Number(order),
          type: type,
          textNotation: textNotation,
          text: text,
        },
      });

      return {
        success: true,
        status: "success",
        message: `Le texte a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du texte.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

export const deleteTextNotation = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteText = await getTextNotationById(id);
      if (!deleteText) {
        return {
          success: false,
          status: "warn",
          message: "Texte introuvable.",
        };
      }
      await prisma.textNotation.delete({
        where: {
          id: id,
        },
      });

      return {
        success: true,
        status: "success",
        message: `Le texte a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression du texte.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result>;
