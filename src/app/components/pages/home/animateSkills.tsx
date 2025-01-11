"use client";

import { useIsMobile } from "@/app/hooks/useMobile";
import { AnimatePresence, motion } from "motion/react"; // Utilisation de 'framer-motion'
import Image from "next/image";

const skills = [
  {
    id: 1,
    title: "Css3",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
    },
  },

  {
    id: 2,
    title: "React",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732098880754-6727-l1U5jpD7vxgIJFboEvd3UG84PsFPwd.svg",
    },
  },
  {
    id: 3,
    title: "JavaScript",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099482873-9254-MUnQ9W5Q4XnbGvTvt3nY4NKxpDDkWv.svg",
    },
  },
  {
    id: 4,
    title: "Next.js",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099495081-8271-HtySgOkcL8ACQqDRMWSBqtN60coZDd.svg",
    },
  },
  {
    id: 5,
    title: "html",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732101804347-1900-JFqccIYGWB4mGLxtyw3y3AB3BfF6tO.svg",
    },
  },
  {
    id: 6,
    title: "Git",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733472473828-1850-jxv26tLgHA13JUuUZRW3NEioVK4qQp.svg",
    },
  },
  {
    id: 7,
    title: "Sass",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733463216281-4735-kk2LSFOH0wtayqvS2IrpNFGWpY8TPs.svg",
    },
  },
  {
    id: 8,
    title: "Sqlite",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1734020300247-9599-mdpcrSMLU2N5num8wtKFFUpVKZDX7P.svg",
    },
  },
  {
    id: 11,
    title: "Css3",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1731739323739-5473-LDrbdAXPmmntzt5cPCnABZ1BS7aQLf.svg",
    },
  },

  {
    id: 12,
    title: "React",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732098880754-6727-l1U5jpD7vxgIJFboEvd3UG84PsFPwd.svg",
    },
  },
  {
    id: 13,
    title: "JavaScript",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099482873-9254-MUnQ9W5Q4XnbGvTvt3nY4NKxpDDkWv.svg",
    },
  },
  {
    id: 14,
    title: "Next.js",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732099495081-8271-HtySgOkcL8ACQqDRMWSBqtN60coZDd.svg",
    },
  },
  {
    id: 15,
    title: "html",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1732101804347-1900-JFqccIYGWB4mGLxtyw3y3AB3BfF6tO.svg",
    },
  },
  {
    id: 16,
    title: "Git",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733472473828-1850-jxv26tLgHA13JUuUZRW3NEioVK4qQp.svg",
    },
  },
  {
    id: 17,
    title: "Sass",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1733463216281-4735-kk2LSFOH0wtayqvS2IrpNFGWpY8TPs.svg",
    },
  },
  {
    id: 18,
    title: "Sqlite",
    image: {
      url: "https://tx41fcbjdi0olrou.public.blob.vercel-storage.com/skills/1734020300247-9599-mdpcrSMLU2N5num8wtKFFUpVKZDX7P.svg",
    },
  },
];

export function AnimateSkills({
  direction = "left",
  speed = 30,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const isMobile = useIsMobile();
  const isLeft = direction === "left";
  const translateX = "-25%";
  const animation = isLeft ? ["0%", translateX] : [translateX, "0%"];

  return (
    <AnimatePresence>
      <motion.div
        className="flex gap-10"
        style={{
          width: "max-content",
        }}
        animate={{
          x: animation,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          duration: speed,
          ease: "linear",
        }}
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.id}-${index}`}
            className="rounded-xl border border-border shadow-custom"
          >
            <Image
              src={skill.image?.url || "/globe.svg"}
              alt={`${skill.title} logo`}
              className="object-cover rounded-xl p-1"
              width={isMobile ? 70 : 100}
              height={isMobile ? 70 : 100}
            />
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
