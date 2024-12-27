"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";

export default function Section({
  section,
}: {
  section: Prisma.SectionGetPayload<{ include: { image: true } }>;
}) {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-blue-800">
      <h2 className="md:text-6xl text-4xl font-bold text-white">
        {section?.title || "Introuvable"}
      </h2>
      <p className="text-white text-xl text-center">
        {section?.subtitle || "Introuvable"}
      </p>
      <div
        className={`w-full flex items-center justify-center bg-red-800 ${
          section?.image?.position === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <Image
          src={section?.image?.url || "../default.svg"}
          alt={section?.image?.alt || "Image par default"}
          className=""
          width={100}
          height={100}
        />
        <p className="text-white text-xl text-center">
          {section?.description || "Introuvable"}
        </p>
      </div>
    </section>
  );
}
