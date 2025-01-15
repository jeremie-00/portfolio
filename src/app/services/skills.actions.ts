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
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: title,
    },
  },

  {
    id: 2,
    title: "React",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732098880754-6727-l1U5jpD7vxgIJFboEvd3UG84PsFPwd.svg",
      alt: title,
    },
  },
  {
    id: 3,
    title: "JavaScript",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099482873-9254-MUnQ9W5Q4XnbGvTvt3nY4NKxpDDkWv.svg",
      alt: title,
    },
  },
  {
    id: 4,
    title: "Next.js",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099495081-8271-HtySgOkcL8ACQqDRMWSBqtN60coZDd.svg",
      alt: title,
    },
  },
  {
    id: 5,
    title: "html",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732101804347-1900-JFqccIYGWB4mGLxtyw3y3AB3BfF6tO.svg",
      alt: title,
    },
  },
  {
    id: 6,
    title: "Git",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733472473828-1850-jxv26tLgHA13JUuUZRW3NEioVK4qQp.svg",
      alt: title,
    },
  },
  {
    id: 7,
    title: "Sass",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733463216281-4735-kk2LSFOH0wtayqvS2IrpNFGWpY8TPs.svg",
      alt: title,
    },
  },
  {
    id: 8,
    title: "Sqlite",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1734020300247-9599-mdpcrSMLU2N5num8wtKFFUpVKZDX7P.svg",
      alt: title,
    },
  },
  {
    id: 11,
    title: "Css3",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
      alt: title,
    },
  },

  {
    id: 12,
    title: "React",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732098880754-6727-l1U5jpD7vxgIJFboEvd3UG84PsFPwd.svg",
      alt: title,
    },
  },
  {
    id: 13,
    title: "JavaScript",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099482873-9254-MUnQ9W5Q4XnbGvTvt3nY4NKxpDDkWv.svg",
      alt: title,
    },
  },
  {
    id: 14,
    title: "Next.js",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099495081-8271-HtySgOkcL8ACQqDRMWSBqtN60coZDd.svg",
      alt: title,
    },
  },
  {
    id: 15,
    title: "html",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732101804347-1900-JFqccIYGWB4mGLxtyw3y3AB3BfF6tO.svg",
      alt: title,
    },
  },
  {
    id: 16,
    title: "Git",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733472473828-1850-jxv26tLgHA13JUuUZRW3NEioVK4qQp.svg",
      alt: title,
    },
  },
  {
    id: 17,
    title: "Sass",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733463216281-4735-kk2LSFOH0wtayqvS2IrpNFGWpY8TPs.svg",
      alt: title,
    },
  },
  {
    id: 18,
    title: "Sqlite",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1734020300247-9599-mdpcrSMLU2N5num8wtKFFUpVKZDX7P.svg",
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
