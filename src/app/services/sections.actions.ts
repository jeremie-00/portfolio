"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { SectionType } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";

export const getSection = async () => {
  return await prisma.section.findMany();
};

export const getSectionDetails = async (slug: string) => {
  return await prisma.section.findUnique({
    where: {
      section: slug,
    },
  });
};

export const getSectionById = async (id: string) => {
  return await prisma.section.findUnique({
    where: {
      id: id,
    },
  });
};

const sectionSchemaCreate = zfd.formData({
  section: z.string().nonempty({ message: "Vous devez fournir une section" }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  text: z.string().optional(),
});

export const createSection = authActionClient
  .schema(sectionSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { section, title, text } = formData;
      const createSection = await prisma.section.create({
        data: {
          section: section,
          title: title,
          text: text,
        },
      });
      return {
        state: createSection,
        success: true,
        status: "success",
        message: `La section a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création de la section.",
      };
    }
  }) as (formData: FormData) => Promise<Result<SectionType>>;

const sectionSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  section: z.string().nonempty({ message: "Vous devez fournir une section" }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  text: z.string().optional(),
});

export const updateSection = authActionClient
  .schema(sectionSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, section, title, text } = formData;
      const updateSection = await prisma.section.update({
        where: {
          id: id,
        },
        data: {
          section: section,
          title: title,
          text: text,
        },
      });
      return {
        state: updateSection,
        success: true,
        status: "success",
        message: `La section a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour de la section.",
      };
    }
  }) as (formData: FormData) => Promise<Result<SectionType>>;

export const deleteSection = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteSection = await getSectionById(id);
      if (!deleteSection) {
        return {
          success: false,
          status: "warn",
          message: "Section introuvable.",
        };
      }
      await prisma.section.delete({
        where: {
          id: id,
        },
      });

      return {
        state: deleteSection,
        success: true,
        status: "success",
        message: `La section a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression de la section.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result<SectionType>>;
