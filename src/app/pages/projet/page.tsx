"use client";
import { Hero } from "@/app/components/pages/hero";
import { SectionProjetsCards } from "@/app/components/pages/projets/sectionProjetsCards";
import { useAvatar } from "@/app/dashboard/avatar/useAvatar";
import { useSections } from "@/app/dashboard/sections/useSections";

export default function Projet() {
  const { datas: avatars } = useAvatar();
  const avatar = avatars.find((avatar) => avatar.page === "projet") || null;
  const { datas: sectionsHero } = useSections();
  const section =
    sectionsHero.find((section) => section.section === "projet") || null;

  return (
    <>
      <Hero avatar={avatar} section={section} />
      <SectionProjetsCards />
    </>
  );
}
