"use client";
import { useProjets } from "@/app/dashboard/projet/useProjets";
import { CardProjet } from "./cardProjet";

export function SectionProjetsCards() {
  const { datas: projets } = useProjets();
  return (
    <section className="section  items-center justify-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6">
        {projets.map((projet, i) => (
          <CardProjet key={i} projet={projet} />
        ))}
      </div>
    </section>
  );
}
