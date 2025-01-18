"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParallax } from "react-scroll-parallax";

import { useIsMobile } from "../hooks/useMobile";
import { Bull } from "./ChatBull";

interface AvatarProps {
  imgRecto: string;
  imgVerso: string;
  textBull?: string;
  arrowBullPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "middleTopLeft"
    | "middleTopRight"
    | "middleBottomLeft"
    | "middleBottomRight";
}

export function Avatar({
  imgRecto,
  imgVerso,
  textBull,
  arrowBullPosition,
}: AvatarProps) {
  const isMobile = useIsMobile();
  const [sizeAvatar, setSizeAvatar] = useState(isMobile ? 200 : 300);
  const [sizeCircle, setSizeCircle] = useState(sizeAvatar + 50);
  const [transitionImage, setTransitionImage] = useState(false);

  const parallax = useParallax<HTMLDivElement>({
    rotateY: [0, 180],
    shouldAlwaysCompleteAnimation: true,
    shouldDisableScalingTranslations: true,
    rootMargin: !isMobile
      ? { top: -450, right: 100, bottom: -450, left: 100 }
      : { top: -300, right: 100, bottom: -300, left: 100 },
  });

  useEffect(() => {
    setSizeAvatar(isMobile ? 200 : 300);
    setSizeCircle(sizeAvatar + 50);
  }, [sizeAvatar, isMobile, sizeCircle]);

  // Changer l'image quand la rotation est supérieure à 90°
  useEffect(() => {
    const handleScroll = () => {
      const element = parallax.ref.current;
      const rotateY = element.style.transform;
      const valueRotateY = rotateY.match(/rotateY\((-?\d+(\.\d+)?)deg\)/);

      if (element && valueRotateY) {
        if (Number(valueRotateY[1]) > 90) {
          setTransitionImage(true);
        } else if (Number(valueRotateY[1]) < 90) {
          setTransitionImage(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallax.ref]);

  return (
    <div className="flex flex-col items-center justify-center gap-10 relative">
      <div ref={parallax.ref} className="spinner">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                width: sizeAvatar,
                height: sizeAvatar,
              }}
              className="absolute flex items-center justify-center z-20"
            >
              <Image
                className="object-cover place-self-center"
                src={transitionImage ? imgVerso : imgRecto}
                quality={100}
                alt="Memoji de profil de l'utilisateur"
                aria-label="Memoji de profil"
                width={800}
                height={800}
                style={{
                  width: sizeAvatar,
                  height: sizeAvatar,
                }}
                loading="lazy"
              />
            </motion.div>

            {/* Circle */}
            <motion.svg
              className={`rounded-full z-10 bg-background/10 backdrop-blur-sm shadow-custom
              ${isMobile ? "w-[250px] h-[250px]" : "w-[350px] h-[350px]"}`}
              fill="transparent"
              viewBox={"0 0 506 506"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="253"
                cy="253"
                r="250"
                stroke="hsl(220 66% 58%)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: "24 10 0 0" }}
                animate={{
                  strokeDasharray: [
                    "15 120 25 25 ",
                    "16 25 92 72",
                    "4 250 22 22",
                  ],
                  rotate: [120, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.svg>
          </motion.div>
        </AnimatePresence>
      </div>

      {textBull && transitionImage && (
        <Bull text={textBull} arrowPosition={arrowBullPosition} />
      )}
    </div>
  );
}
