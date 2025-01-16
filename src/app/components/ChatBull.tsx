"use client";
import { motion } from "motion/react";
import Image from "next/image";
import profilepicApropos from "../assets/profilepicApropos.png";
import { useIsMobile } from "../hooks/useMobile";

interface ChatBullProps {
  text: string;
  arrowPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "middleTopLeft"
    | "middleTopRight"
    | "middleBottomLeft"
    | "middleBottomRight";
  positionGrid?: "left" | "right";
}

export const Bull = (props: ChatBullProps) => {
  const isMobile = useIsMobile();
  const { text, arrowPosition, positionGrid } = props;
  const arrowSize = isMobile ? "size-14" : "size-20";
  const arrowTop = isMobile ? "-top-14" : "-top-20";
  const arrowBottom = isMobile ? "-bottom-14" : "-bottom-20";
  const isRight = positionGrid === "right";
  const isMiddleArrow =
    arrowPosition === "middleBottomLeft" ||
    "middleBottomRight" ||
    "middleTopLeft" ||
    "middleTopRight";

  const bullBaseClasse =
    "relative flex items-center justify-center rounded-xl bg-section shadow-custom";

  const arrowBaseClasse = `absolute clip-triangle ${arrowSize} bg-section`;

  const arrowPositionClasses =
    arrowPosition === "topLeft"
      ? `${arrowTop} left-0 -scale-y-100`
      : arrowPosition === "topRight"
      ? `${arrowTop} right-0 -scale-y-100 -scale-x-100`
      : arrowPosition === "bottomLeft"
      ? `${arrowBottom} left-0`
      : arrowPosition === "bottomRight"
      ? `${arrowBottom} right-0 -scale-x-100`
      : arrowPosition === "middleBottomLeft"
      ? `${arrowBottom}`
      : arrowPosition === "middleBottomRight"
      ? `${arrowBottom} -scale-x-100`
      : arrowPosition === "middleTopLeft"
      ? `${arrowTop} -scale-y-100`
      : arrowPosition === "middleTopRight"
      ? `${arrowTop} -scale-y-100 -scale-x-100`
      : "";

  const roundedNone =
    arrowPosition === "topLeft"
      ? "rounded-tl-none"
      : arrowPosition === "topRight"
      ? "rounded-tr-none"
      : arrowPosition === "bottomLeft"
      ? "rounded-bl-none"
      : arrowPosition === "bottomRight"
      ? "rounded-br-none"
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.4, delay: 0.1 }} // 0.4 secondes
      className={`${bullBaseClasse} ${roundedNone} ${
        isMiddleArrow
          ? "col-start-1 col-span-2"
          : isRight
          ? "col-start-1 "
          : "col-start-2"
      } `}
    >
      {/* Fléche de discussion */}
      <span className={`${arrowBaseClasse} ${arrowPositionClasses} `}></span>

      {/* Texte */}
      <p
        lang="fr"
        className="w-full h-full whitespace-break-spaces break-words hyphens-auto p-2 md:p-8 md:text-lg text-sm"
      >
        {text}
      </p>
    </motion.div>
  );
};

export const ChatBull = (props: ChatBullProps) => {
  const { text, arrowPosition, positionGrid } = props;
  const isRight = positionGrid === "right";
  const isMobile = useIsMobile();
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2">
      {/* Image avec inversion horizontale si direction = "right" */}
      <Image
        className={`object-cover z-20 row-start-3 bg-section rounded-full shadow-custom ${
          isRight
            ? "-scale-x-100 col-start-2 place-self-start"
            : "col-start-1 place-self-end"
        } `}
        src={profilepicApropos}
        priority
        quality={100}
        alt="Memoji de profil de l'utilisateur"
        aria-label="Memoji de profil"
        width={800}
        height={800}
        style={{
          width: isMobile ? 150 : 250,
          height: isMobile ? 150 : 250,
        }}
      />
      {/* Bulle de discussion */}
      <Bull
        text={text}
        arrowPosition={arrowPosition}
        positionGrid={positionGrid}
      />
    </div>
  );
};
