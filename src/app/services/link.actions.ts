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
    where: {
      inNav: true,
    },
    orderBy: {
      order: "asc",
    },
  });
};
export const getLinks = async (): Promise<FullLink[]> => {
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
export const getLinksByPage = async (page: string) => {
  return await prisma.link.findUnique({
    where: {
      page: page,
    },
  });
};

const linkSchemaCreated = z.object({
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  inNav: z.boolean(),
  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.number(),
});

export const createdLink = authActionClient
  .schema(linkSchemaCreated)
  .action(async ({ parsedInput: { ...link } }) => {
    try {
      const { page, href, title, order, inNav } = link;

      //const nav = inNav === "on";
      const existingNavigation = await getLinksByPage(page);

      if (existingNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Lien existant.",
        };
      }

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      const createdLink = await prisma.link.create({
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
          inNav: inNav,
        },
      });

      return {
        state: createdLink,
        success: true,
        status: "success",
        message: `Le lien a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création du lien.",
      };
    }
  }) as (link: FullLink) => Promise<Result<FullLink>>;

const linkSchemaCreate = zfd.formData({
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  inNav: z.string().default("off"),
  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
});

export const createLink = authActionClient
  .schema(linkSchemaCreate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { page, href, title, order, inNav } = formData;

      const nav = inNav === "on";

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      const createdLink = await prisma.link.create({
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
          inNav: nav,
        },
      });

      return {
        state: createdLink,
        success: true,
        status: "success",
        message: `Le lien a été créée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la création du lien.",
      };
    }
  }) as (formData: FormData) => Promise<Result<FullLink>>;

const LinkSchemaUpdated = z.object({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  inNav: z.boolean().default(false),
  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.number(),
});

export const updatedLink = authActionClient
  .schema(LinkSchemaUpdated)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, page, href, title, order, inNav } = formData;
      //const nav = inNav === "on";
      console.log(id);
      const existingNavigation = await getNavLinksById(id);

      if (!existingNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Lien introuvable.",
        };
      }

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      const updatedLink = await prisma.link.update({
        where: {
          id: id,
        },
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
          inNav: inNav,
        },
      });

      return {
        state: updatedLink,
        success: true,
        status: "success",
        message: `Le lien a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du lien.",
      };
    }
  }) as (link: FullLink) => Promise<Result<FullLink>>;

const LinkSchemaUpdate = zfd.formData({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
  page: z.string().nonempty({ message: "Vous devez fournir une page" }),
  inNav: z.string().default("off"),
  href: z
    .string()
    .nonempty({ message: "Vous devez fournir un href" })
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().nonempty({ message: "Vous devez fournir un titre" }),
  order: z.string().nonempty({ message: "Vous devez fournir un ordre" }),
});

export const updateLink = authActionClient
  .schema(LinkSchemaUpdate)
  .action(async ({ parsedInput: { ...formData } }) => {
    try {
      const { id, page, href, title, order, inNav } = formData;
      const nav = inNav === "on";
      const existingNavigation = await getNavLinksById(id);

      if (!existingNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Lien introuvable.",
        };
      }

      if (!page || !href || !title) {
        return {
          success: false,
          status: "warn",
          message: `Vous devez fournir un page, un href et un titre.`,
        };
      }

      const updatedLink = await prisma.link.update({
        where: {
          id: id,
        },
        data: {
          page: page,
          href: href,
          title: title,
          order: Number(order),
          inNav: nav,
        },
      });

      return {
        state: updatedLink,
        success: true,
        status: "success",
        message: `Le lien a été mis à jour avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la mise à jour du lien.",
      };
    }
  }) as (formData: FormData) => Promise<Result<FullLink>>;

export const deleteLink = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const deleteNavigation = await getNavLinksById(id);
      if (!deleteNavigation) {
        return {
          success: false,
          status: "warn",
          message: "Lien introuvable.",
        };
      }
      await prisma.link.delete({
        where: {
          id: id,
        },
      });

      return {
        state: deleteNavigation,
        success: true,
        status: "success",
        message: `Le lien a été supprimée avec succès ! 🚀`,
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "Erreur lors de la suppression du lien.",
      };
    }
  }) as ({ id }: { id: string }) => Promise<Result<FullLink>>;
