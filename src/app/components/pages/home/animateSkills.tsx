"use client";

import { useIsMobile } from "@/app/hooks/useMobile";
import { getSkills, SkillProps } from "@/app/services/skills.actions";
import { AnimatePresence, motion } from "motion/react"; // Utilisation de 'framer-motion'
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const [skills, setSkills] = useState<SkillProps[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await getSkills();
      setSkills(skills);
    };
    fetchSkills();
  }, []);

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
