import { title } from "process";

export interface SkillProps {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
}

const skills = [
  {
    id: 1,
    title: "Css3",
    image: {
      url: "/skills/css-3.svg",
      alt: title,
    },
  },

  {
    id: 2,
    title: "React",
    image: {
      url: "/skills/react.svg",
      alt: title,
    },
  },
  {
    id: 3,
    title: "JavaScript",
    image: {
      url: "/skills/javascript.svg",
      alt: title,
    },
  },
  {
    id: 4,
    title: "Next.js",
    image: {
      url: "/skills/nextjs.svg",
      alt: title,
    },
  },
  {
    id: 5,
    title: "HTML",
    image: {
      url: "/skills/html-5.svg",
      alt: title,
    },
  },
  {
    id: 6,
    title: "Git",
    image: {
      url: "/skills/git.svg",
      alt: title,
    },
  },
  {
    id: 7,
    title: "Sass",
    image: {
      url: "/skills/sass.svg",
      alt: title,
    },
  },
  {
    id: 8,
    title: "Sqlite",
    image: {
      url: "/skills/sqlite.svg",
      alt: title,
    },
  },
  {
    id: 9,
    title: "Figma",
    image: {
      url: "/skills/figma.svg",
      alt: title,
    },
  },
  {
    id: 10,
    title: "Vite",
    image: {
      url: "/skills/vite.svg",
      alt: title,
    },
  },
  {
    id: 11,
    title: "Vercel",
    image: {
      url: "/skills/vercel.svg",
      alt: title,
    },
  },
  {
    id: 12,
    title: "Typescript",
    image: {
      url: "/skills/typescript.svg",
      alt: title,
    },
  },
  {
    id: 13,
    title: "Tailwind",
    image: {
      url: "/skills/tailwind.svg",
      alt: title,
    },
  },
  {
    id: 14,
    title: "Python",
    image: {
      url: "/skills/python.svg",
      alt: title,
    },
  },
  {
    id: 15,
    title: "Prisma",
    image: {
      url: "/skills/prisma.svg",
      alt: title,
    },
  },
  {
    id: 16,
    title: "Postgresql",
    image: {
      url: "/skills/postgresql.svg",
      alt: title,
    },
  },
  {
    id: 17,
    title: "MongoDb",
    image: {
      url: "/skills/mongodb.svg",
      alt: title,
    },
  },
  {
    id: 18,
    title: "Github",
    image: {
      url: "/skills/github.svg",
      alt: title,
    },
  },
  {
    id: 19,
    title: "Node.js",
    image: {
      url: "/skills/nodejs.svg",
      alt: title,
    },
  },
];

export const getSkills = async (): Promise<SkillProps[]> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    setTimeout(() => resolve(skills), 100); // Simule une latence
  });
};

/* import { title } from "process";

export interface SkillProps {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
}

const skills = [
  {
    id: 1,
    title: "Css3",
    image: {
      url: "/skills/css-3.svg",
      alt: title,
    },
  },

  {
    id: 2,
    title: "React",
    image: {
      url: "/skills/react.svg",
      alt: title,
    },
  },
  {
    id: 3,
    title: "JavaScript",
    image: {
      url: "/skills/javascript.svg",
      alt: title,
    },
  },
  {
    id: 4,
    title: "Next.js",
    image: {
      url: "/skills/nextjs.svg",
      alt: title,
    },
  },
  {
    id: 5,
    title: "HTML",
    image: {
      url: "/skills/html-5.svg",
      alt: title,
    },
  },
  {
    id: 6,
    title: "Git",
    image: {
      url: "/skills/git.svg",
      alt: title,
    },
  },
  {
    id: 7,
    title: "Sass",
    image: {
      url: "/skills/sass.svg",
      alt: title,
    },
  },
  {
    id: 8,
    title: "Sqlite",
    image: {
      url: "/skills/sqlite.svg",
      alt: title,
    },
  },
  {
    id: 9,
    title: "Figma",
    image: {
      url: "/skills/figma.svg",
      alt: title,
    },
  },
  {
    id: 10,
    title: "Vite",
    image: {
      url: "/skills/vite.svg",
      alt: title,
    },
  },
  {
    id: 11,
    title: "Vercel",
    image: {
      url: "/skills/vercel.svg",
      alt: title,
    },
  },
  {
    id: 12,
    title: "Typescript",
    image: {
      url: "/skills/typescript.svg",
      alt: title,
    },
  },
  {
    id: 13,
    title: "Tailwind",
    image: {
      url: "/skills/tailwind.svg",
      alt: title,
    },
  },
  {
    id: 14,
    title: "Python",
    image: {
      url: "/skills/python.svg",
      alt: title,
    },
  },
  {
    id: 15,
    title: "Prisma",
    image: {
      url: "/skills/prisma.svg",
      alt: title,
    },
  },
  {
    id: 16,
    title: "Postgresql",
    image: {
      url: "/skills/postgresql.svg",
      alt: title,
    },
  },
  {
    id: 17,
    title: "MongoDb",
    image: {
      url: "/skills/mongodb.svg",
      alt: title,
    },
  },
  {
    id: 18,
    title: "Github",
    image: {
      url: "/skills/github.svg",
      alt: title,
    },
  },
];

export const getSkills = async (): Promise<SkillProps[]> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    setTimeout(() => resolve(skills), 100); // Simule une latence
  });
};
 */
