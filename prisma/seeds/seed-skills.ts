import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const skills = [
  {
    id: 1,
    title: "Css3",
    image: {
      url: "/skills/css-3.svg",
      alt: "Logo de Css3",
    },
  },

  {
    id: 2,
    title: "React",
    image: {
      url: "/skills/react.svg",
      alt: "Logo de React",
    },
  },
  {
    id: 3,
    title: "JavaScript",
    image: {
      url: "/skills/javascript.svg",
      alt: "Logo de JavaScript",
    },
  },
  {
    id: 4,
    title: "Next.js",
    image: {
      url: "/skills/nextjs.svg",
      alt: "Logo de Next.js",
    },
  },
  {
    id: 5,
    title: "HTML",
    image: {
      url: "/skills/html-5.svg",
      alt: "Logo de HTML",
    },
  },
  {
    id: 6,
    title: "Git",
    image: {
      url: "/skills/git.svg",
      alt: "Logo de Git",
    },
  },
  {
    id: 7,
    title: "Sass",
    image: {
      url: "/skills/sass.svg",
      alt: "Logo de Sass",
    },
  },
  {
    id: 8,
    title: "Sqlite",
    image: {
      url: "/skills/sqlite.svg",
      alt: "Logo de Sqlite",
    },
  },
  {
    id: 9,
    title: "Figma",
    image: {
      url: "/skills/figma.svg",
      alt: "Logo de Figma",
    },
  },
  {
    id: 10,
    title: "Vite",
    image: {
      url: "/skills/vite.svg",
      alt: "Logo de Vite",
    },
  },
  {
    id: 11,
    title: "Vercel",
    image: {
      url: "/skills/vercel.svg",
      alt: "Logo de Vercel",
    },
  },
  {
    id: 12,
    title: "Typescript",
    image: {
      url: "/skills/typescript.svg",
      alt: "Logo de Typescript",
    },
  },
  {
    id: 13,
    title: "Tailwind",
    image: {
      url: "/skills/tailwind.svg",
      alt: "Logo de Tailwind",
    },
  },
  {
    id: 14,
    title: "Python",
    image: {
      url: "/skills/python.svg",
      alt: "Logo de Python",
    },
  },
  {
    id: 15,
    title: "Prisma",
    image: {
      url: "/skills/prisma.svg",
      alt: "Logo de Prisma",
    },
  },
  {
    id: 16,
    title: "Postgresql",
    image: {
      url: "/skills/postgresql.svg",
      alt: "Logo de Postgresql",
    },
  },
  {
    id: 17,
    title: "MongoDb",
    image: {
      url: "/skills/mongodb.svg",
      alt: "Logo de MongoDb",
    },
  },
  {
    id: 18,
    title: "Github",
    image: {
      url: "/skills/github.svg",
      alt: "Logo de Github",
    },
  },
  {
    id: 19,
    title: "Node.js",
    image: {
      url: "/skills/nodejs.svg",
      alt: "Logo de Node.js",
    },
  },
];

async function main() {
  console.log("Seeding skills database...");

  for (const skill of skills) {
    const {
      title,
      image: { url, alt },
    } = skill;

    await prisma.skill.create({
      data: {
        title: title,
        image: url
          ? {
              create: {
                url: url,
                alt: alt,
              },
            }
          : undefined,
      },
    });
  }

  console.log("Seeding skills complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
