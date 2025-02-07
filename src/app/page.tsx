import { Hero } from "./components/pages/hero";
import About from "./components/pages/home/about";
import Skills from "./components/pages/home/skills";
import { ParticlesBackground } from "./components/particles";
import { getAbout } from "./services/about.actions";
import { getAvatarByPage } from "./services/avatar.actions";
import { getSectionDetails } from "./services/textHero.actions";
import { getTextNotationByPage } from "./services/textNotation.actions";

export default async function Home() {
  const avatar = await getAvatarByPage("accueil");
  const sectionHero = await getSectionDetails("accueil");
  const textsNotation = await getTextNotationByPage("accueil");

  const sectionAbout = await getSectionDetails("about");
  const abouts = await getAbout();

  return (
    <>
      <ParticlesBackground />
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
