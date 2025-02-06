import { getSkills } from "@/app/services/skills.actions";
import { getSectionDetails } from "@/app/services/textHero.actions";
import { Banner, Container, Content } from "../../containers";
import { AnimateSkills } from "./animateSkills";
import { FullSkill } from "@/app/types/prismaType";

function shuffleArray(array: FullSkill[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

export default async function Skills() {
  const section = await getSectionDetails("skill");
  const skills = await getSkills();
  const shuffledSkills = shuffleArray(skills);

  if (!section) return null;

  return (
    <>
      <section className="section flex-col items-center justify-center bg-linear-custom overflow-x-hidden">
        <Container>
          <Content>
            <h2 className="h2">{section.title}</h2>
            <p className="p">{section.text}</p>
          </Content>
        </Container>
        <div className="w-[110vw] flex flex-col items-center justify-center xl:gap-32 gap-20 md:py-32 py-14">
          <Banner className="rotate-3">
            <AnimateSkills skills={skills} />
          </Banner>
          <Banner className="rotate-negative-3">
            <AnimateSkills
              skills={shuffledSkills}
              direction={"right"}
              speed={30}
            />
          </Banner>
        </div>
      </section>
    </>
  );
}
