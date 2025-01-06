"use client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";

export function Transitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div
        key={pathname}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
          }}
          className="h-screen w-screen fixed bg-background top-0 pointer-events-none z-40"
        />
        {children}
      </div>
    </AnimatePresence>
  );
}
