"use client";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { Stairs } from "./stairs";

export function StairTransition() {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <div key={pathname}>
          <div className="flex h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-50">
            <Stairs />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
