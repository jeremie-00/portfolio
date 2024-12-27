import prisma from "../lib/prisma";

export async function getSectionsByPage(page: string) {
  return await prisma.section.findMany({
    where: {
      page: Number(page),
    },
    include: {
      image: true,
    },
  });
}
