import prisma from "../lib/prisma";

export async function getSectionsForHeader() {
  return await prisma.section.findMany({
    include: {
      image: true,
    },
  });
}

export async function getSectionsForSubMenu() {
  return await prisma.section.findMany({
    where: { order: { not: 1 } },
    include: {
      image: true,
    },
  });
}

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
