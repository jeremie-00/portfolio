"use client";
import { getProjets, ProjetProps } from "@/app/services/projets.actions";
import { useEffect, useState } from "react";
import { CardProjet } from "./cardProjet";

export function SectionProjetsCards() {
  const [projets, setProjets] = useState<ProjetProps[]>([]);
  useEffect(() => {
    const fetchProjets = async () => {
      const data = await getProjets();
      setProjets(data);
    };
    fetchProjets();
  }, []);
  return (
    <section className="section bg-linear-custom items-center justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6">
        {projets.map((projet, i) => (
          <CardProjet key={i} projet={projet} />
        ))}
      </div>
    </section>
  );
}
