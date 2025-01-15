"use client";

import { ContactForm } from "@/app/components/pages/contact/contactForm";
import { Hero } from "@/app/components/pages/hero";
import { SectionProjetsCards } from "@/app/components/pages/projets/sectionProjetsCards";
import { ParticlesBackground } from "@/app/components/particles";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  let paramsId = Array.isArray(params?.id) ? params.id[0] : params.id;
  paramsId = paramsId === undefined ? "0" : paramsId;

  return (
    <>
      <ParticlesBackground />
      <Hero />
      {paramsId === "1" && <SectionProjetsCards />}
      {paramsId === "2" && <ContactForm />}
    </>
  );
}
