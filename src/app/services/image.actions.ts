import { del, put } from "@vercel/blob";
import { extname } from "path";
import prisma from "../lib/prisma";
import { ImageType } from "../types/prismaType";

const generateUniqueFileName = (originalName: string, title: string) => {
  const fileExtension = extname(originalName);

  // Obtenir la date actuelle
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
  const year = now.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return `${title}-${formattedDate}-${Date.now()}-${Math.round(
    Math.random() * 1e4
  )}${fileExtension}`;
};

export const imageUpload = async ({
  title,
  file,
  folder,
}: {
  title: string;
  file: File;
  folder: string;
}): Promise<string> => {
  const filename = generateUniqueFileName(file.name, title);
  const blob = await put(`Portfolio-jh-tech/${folder}/${filename}`, file, {
    access: "public",
  });

  if (!blob.url) {
    throw new Error("Erreur lors de la création de l'image avec Vercel.");
  }

  return blob.url;
};

export const imageDelete = async ({ image }: { image: ImageType }) => {
  if (image.url && image.id) {
    await del(image.url);
    await prisma.image.delete({
      where: { id: image.id },
    });
  }
  return;
};
