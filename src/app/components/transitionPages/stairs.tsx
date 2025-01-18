import { motion } from "motion/react";

const stairAnimation = {
  initial: {
    transform: "translateY(0%)",
  },
  animate: {
    transform: "translateY(100%)",
  },
  exit: {
    transform: "translateY(0%)",
  },
};

const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};

export function Stairs() {
  return (
    <>
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            className="relative w-full h-full bg-transition"
          />
        );
      })}
    </>
  );
}
