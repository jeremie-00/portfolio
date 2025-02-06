import { Hero } from "@/app/components/pages/hero";
import { SectionProjetsCards } from "@/app/components/pages/projets/sectionProjetsCards";
import { ParticlesBackground } from "@/app/components/particles";
import { getAvatarById } from "@/app/services/avatar.actions";
import { getSectionDetails } from "@/app/services/textHero.actions";

export default async function Projet() {
  const avatar = await getAvatarById("projet");
  const section = await getSectionDetails("projet");
  return (
    <>
      <ParticlesBackground />
      {section && <Hero avatar={avatar} section={section} />}
      <SectionProjetsCards />
    </>
  );
}
