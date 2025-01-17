"use client";

import { useIsMobile } from "@/app/hooks/useMobile";
import { getSkills, SkillProps } from "@/app/services/skills.actions";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

function shuffleArray(array: SkillProps[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

export function AnimateSkills({
  direction = "left",
  speed = 50,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const isMobile = useIsMobile();
  const isLeft = direction === "left";
  const translateX = "-50.5%";
  const animation = isLeft ? ["0%", translateX] : [translateX, "0%"];

  const [skills, setSkills] = useState<SkillProps[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await getSkills();
      const shuffledSkills = shuffleArray(skills);
      setSkills(shuffledSkills);
    };
    fetchSkills();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
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
              src={skill.image?.url || "/default.svg"}
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
