import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import profilepic from "../assets/profilepic.png";

export function Avatar({ size }: { size: number }) {
  const [sizeCircle, setSizeCircle] = useState(size + 50);

  useEffect(() => {
    setSizeCircle(size + 50);
  }, [size]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {/*Image*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            width: size,
            height: size,
          }}
          className="absolute flex items-center justify-center"
        >
          <Image
            className="object-cover place-self-center"
            src={profilepic}
            priority
            quality={100}
            alt="profile"
            width={800}
            height={800}
            style={{
              width: size,
              height: size,
            }}
          />
        </motion.div>

        {/*Circle*/}
        <motion.svg
          className={`w-[${sizeCircle}px] h-[${sizeCircle}px] `}
          fill="transparent"
          viewBox={"0 0 506 506"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="green"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "34 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25 ", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
