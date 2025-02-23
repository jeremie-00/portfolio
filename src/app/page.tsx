"use client";
import { Hero } from "./components/pages/hero";
import About from "./components/pages/home/about";
import Skills from "./components/pages/home/skills";
import { useAbout } from "./dashboard/about/useAbouts";
import { useAvatar } from "./dashboard/avatar/useAvatar";
import { useNotation } from "./dashboard/notation/useNotation";
import { useSections } from "./dashboard/sections/useSections";

export default function Home() {
  const { datas: abouts } = useAbout();
  const { datas: avatars } = useAvatar();
  const avatar = avatars.find((avatar) => avatar.page === "accueil") || null;
  const { datas: sectionsHero } = useSections();
  const sectionHero =
    sectionsHero.find((section) => section.section === "accueil") || null;
  const sectionAbout =
    sectionsHero.find((section) => section.section === "about") || null;
  const { datas: textsNotations } = useNotation();
  const textsNotation = textsNotations.filter(
    (text) => text.page === "accueil"
  );

  return (
    <>
      <Hero
        avatar={avatar}
        section={sectionHero}
        textsNotation={textsNotation}
      />
      <Skills />

      {sectionAbout && <About section={sectionAbout} abouts={abouts} />}
    </>
  );
}
