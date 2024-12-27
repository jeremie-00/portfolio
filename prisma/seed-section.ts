import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sections = [
  {
    page: 1,
    order: 1,
    name: "Technologies",
    title: "title Technologies",
    subtitle: "subtitle des technologies",
    description: "description des technologies",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 1,
    order: 2,
    name: "Design",
    title: "title Design",
    subtitle: "subtitle des Design",
    description: "description des Design",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "right",
    },
  },
  {
    page: 1,
    order: 3,
    name: "Finance",
    title: "title Finance",
    subtitle: "subtitle des Finance",
    description: "description des Finance",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
      position: "left",
    },
  },
  {
    page: 2,
    order: 1,
    name: "Design",
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
    name: "Marketing",
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
    name: "Finance",
    title: "title Finance",
    subtitle: "subtitle des Finance",
    description: "description des Finance",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: "Image",
    },
  },
];

async function main() {
  console.log("Seeding database...");

  for (const section of sections) {
    const { name, description, image, page, order, title, subtitle } = section;

    await prisma.section.create({
      data: {
        name,
        title,
        subtitle,
        description,
        page,
        order,
        image: {
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
