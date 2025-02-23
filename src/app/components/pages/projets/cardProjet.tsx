"use client";

import { FullProjet } from "@/app/types/prismaType";
import { useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import imageStateDefault from "../../../../../public/default.svg";
import Badge from "../../badge";
import { Button } from "../../buttons/buttons";
import { Card } from "../../cards/cards";

export function CardProjet({ projet }: { projet: FullProjet }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const { id, title, shortDesc, skills, cover } = projet;
  return (
    <div ref={ref} className="relative">
      <div
        className="w-full h-full flex opacity-0 transition-all duration-500 ease-in-out"
        style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
        }}
      >
        <Card theme="secondary">
          <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-popover/40 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
            <Button href={`/pages/projet/${id}`} theme="primary" size="sm">
              Voir le projet
            </Button>
          </div>
          <Image
            src={cover ? cover.url : imageStateDefault}
            alt={cover ? cover.alt : "Image par défaut"}
            width={400}
            height={400}
            className="aspect-imgCardProjet object-contain rounded-lg bg-section shadow-lg border border-border"
            loading="lazy"
          />

          <div className="w-full h-full flex flex-1 gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{title}</h3>
              <hr className="w-20 border-primary border-[1.5px]"></hr>
              <p>{shortDesc}</p>
            </div>
          </div>

          <div className="w-full flex flex-wrap content-start gap-2">
            {skills?.map((skill, i) => (
              <Badge key={i} text={skill.title} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
