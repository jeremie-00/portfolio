import { Banner, Container, Content } from "../../containers";
import { AnimateSkills } from "./animateSkills";

export default function Skills() {
  return (
    <>
      <section className="section flex-col items-center justify-center bg-linear-custom overflow-x-hidden">
        <Container>
          <Content>
            <h2 className="h2">Mes compétences</h2>
            <p className="p">
              Découvrez les outils et technologies que j&apos;utilise pour
              donner vie à mes projets, en combinant créativité et expertise
              technique.
            </p>
          </Content>
        </Container>
        <div className="w-[110vw] flex flex-col items-center justify-center xl:gap-32 gap-20 md:py-32 py-14">
          <Banner className="rotate-3">
            <AnimateSkills />
          </Banner>
          <Banner className="rotate-negative-3">
            <AnimateSkills direction={"right"} speed={30} />
          </Banner>
        </div>
      </section>
    </>
  );
}
