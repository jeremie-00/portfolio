import { AnimateSkills } from "../../animateSkills";

const GradiantTitle = () => {
  return (
    <h2 className="w-full text-center bg-gradient-to-l from-primary from-20% to-foreground/80 bg-clip-text text-transparent font-extrabold md:text-[4rem] sm:text-[3rem] text-[2.5rem]">
      Mes compétences
    </h2>
  );
};

export default function Skills() {
  return (
    <>
      <section className="relative flex flex-1 flex-col items-center justify-center bg-linear-custom from-section from-40% to-transparent gap-6 px-20 pt-14 pb-0">
        <GradiantTitle />
        <p className="text-center font-medium lg:text-[2rem] md:text-[1.75rem] sm:text-[1.5rem] text-[1.25rem]">
          Découvrez les outils et technologies que j&apos;utilise pour donner
          vie à mes projets, en combinant créativité et expertise technique.
        </p>
      </section>
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-custom from-transparent to-section to-20% pb-24">
        <div className="flex flex-1 flex-col items-center justify-center xl:gap-32 gap-20 md:py-32 py-14">
          <div className="bg-card rotate-3 py-6 w-full shadow-lg dark:shadow-md dark:shadow-primary/40 ">
            <AnimateSkills />
          </div>
          <div className="bg-card rotate-negative-3 py-6 w-full shadow-lg dark:shadow-md dark:shadow-primary/40 mx-10">
            <AnimateSkills direction={"right"} speed={30} />
          </div>
        </div>
      </section>
    </>
  );
}
