"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import prisma from "../lib/prisma";
import { authActionClient } from "../lib/safe-action";
import { Result } from "../types/globalType";
import { FullSkill } from "../types/prismaType";
import { deleteSchema } from "../types/zodType";
import { imageDelete, imageUpload } from "./image.actions";

export const getSkills = async (): Promise<FullSkill[]> => {
  return prisma.skill.findMany({
    include: { image: true },
  });
};

export const getSkillById = async (id: string): Promise<FullSkill | null> => {
  return prisma.skill.findUnique({
    where: { id },
    include: { image: true },
  });
};

const skillSchemaCreate = zfd.formData({
  title: z.string().nonempty("Vous devez fournir un titre"),
  image: z.instanceof(File).optional(),
});

export const createSkill = authActionClient
  .schema(skillSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { title, image } = formData;
      const url =
        image && image?.size > 0
          ? await imageUpload({ title, file: image, folder: "skills" })
          : null;

      await prisma.skill.create({
        data: {
          title,
          image: url ? { create: { url, alt: `Logo de ${title}` } } : undefined,
        },
      });

      return {
        success: true,
        status: "success",
        message: `La compétence \"${title}\" a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création de la compétence.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

const skillSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  image: z.instanceof(File).optional(),
});

export const updateSkill = authActionClient
  .schema(skillSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, title, image } = formData;
      const existingSkill = await getSkillById(id);

      if (!existingSkill) {
        return {
          success: false,
          status: "warn",
          message: "Compétence introuvable.",
        };
      }

      const url =
        image && image?.size > 0
          ? await imageUpload({ title, file: image, folder: "skills" })
          : undefined;

      if (existingSkill?.image && url)
        await imageDelete({ image: existingSkill.image });

      await prisma.skill.update({
        where: { id },
        data: {
          title,
          image: url
            ? {
                upsert: {
                  update: { url, alt: `Logo de ${title}` },
                  create: { url, alt: `Logo de ${title}` },
                },
              }
            : undefined,
        },
      });

      return {
        success: true,
        status: "success",
        message: `La compétence \"${title}\" a été mise à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour de la compétence.",
      };
    }
  }) as (formData: FormData) => Promise<Result>;

export const deleteSkill = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const skill = await getSkillById(id);
      if (!skill) {
        return {
          success: false,
          status: "warn",
          message: "Compétence introuvable.",
        };
      }

      if (skill.image) await imageDelete({ image: skill.image });
      await prisma.skill.delete({ where: { id: id } });

      return {
        success: true,
        status: "success",
        message: `La compétence \"${skill.title}\" a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression de la compétence.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result>;
