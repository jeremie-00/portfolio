import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sections = [
  {
    page: 0,
    order: 1,
    href: "Accueil",
    title: "title Accueil",
    subtitle: "subtitle des accueil",
    description: "description des accueil",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 0,
    order: 2,
    href: "A propos de moi",
    title: "title propos",
    subtitle: "subtitle des propos",
    description: "description des propos",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 0,
    order: 3,
    href: "Mon parcours",
    title: "title Accueparcoursil",
    subtitle: "subtitle des parcours",
    description: "description des parcours",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 1,
    order: 1,
    href: "A propos de moi",
    title: "title a propos",
    subtitle: "subtitle des a propos",
    description: "description des a propos",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 1,
    order: 2,
    href: "Mes technologies favorites",
    title: "title technologies favorites",
    subtitle: "subtitle des technologies favorites",
    description: "description des technologies favorites",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "right",
    },
  },
  {
    page: 1,
    order: 3,
    href: "Mon profil",
    title: "title profil",
    subtitle: "subtitle des profil",
    description: "description des profil",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 1,
    order: 4,
    href: "Mes hobbies",
  },
  {
    page: 2,
    order: 1,
    href: "Design",
    title: "title Design",
    subtitle: "subtitle des Design",
    description: "description des Design",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
    },
  },
  {
    page: 3,
    order: 1,
    href: "Marketing",
    title: "title Marketing",
    subtitle: "subtitle des Marketing",
    description: "description des Marketing",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
    },
  },
  {
    page: 4,
    order: 1,
    href: "Finance",
    title: "title Finance",
    subtitle: "subtitle des Finance",
    description: "description des Finance",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
    },
  },
  {
    page: 5,
    order: 1,
    href: "Dashboard",
    title: "title Dashboard",
    subtitle: "subtitle des Dashboard",
    description: "description des Dashboard",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const section of sections) {
    const { href, description, image, page, order, title, subtitle } = section;

    await prisma.section.create({
      data: {
        href,
        title,
        subtitle,
        description,
        page,
        order,
        image: image && {
          create: {
            url: image.url,
            alt: image.alt,
            position: image?.position,
          },
        },
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
