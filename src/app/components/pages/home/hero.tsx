"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { Avatar } from "../../avatar";
import { Button } from "../../buttons/buttons";
import SectionMarker from "../../sectionMarker";

const GradiantTitle = () => {
  return (
    <h1 className="w-full text-center bg-gradient-to-l from-primary from-20% to-foreground/80 bg-clip-text text-transparent font-extrabold text-center lg:text-[5.5rem] md:text-[4rem] sm:text-[3rem] text-[2.5rem]">
      Développeur Web React
    </h1>
  );
};

const HighlightedText = () => {
  const isMobile = useIsMobile();
  return (
    <div className="md:px-10 px-0 text-center font-medium lg:text-[2rem] md:text-[1.75rem] sm:text-[1.5rem] text-[1.25rem]">
      <RoughNotationGroup show={true}>
        <p className="leading-loose  items-center">
          <span>
            <RoughNotation
              order="1"
              type="underline"
              color="#6366F1" // Couleur pour l'animation (violet Tailwind)
              animate={true}
              animationDelay={1000}
              strokeWidth={2}
              padding={[0, 0]}
              multiline={true}
            >
              Créateur de site web
            </RoughNotation>
            , je conçois et développe des applications web modernes,
          </span>
          <RoughNotation
            order="2"
            type="circle"
            color="#6366F1" // Couleur pour l'animation (violet Tailwind)
            animate={true}
            animationDelay={1000}
            strokeWidth={1}
            padding={isMobile ? [5, 20] : [10, 25]}
            multiline={true}
          >
            &nbsp;dynamiques et performantes,
          </RoughNotation>
          &nbsp;du design au déploiement, avec une attention particulière
          pour&nbsp;
          <RoughNotation
            order="3"
            type="underline"
            color="#6366F1" // Couleur pour l'animation (violet Tailwind)
            animate={true}
            animationDelay={1000}
            strokeWidth={2}
            padding={[0, 0]}
            multiline={true}
          >
            l&apos;expérience utilisateur.
          </RoughNotation>
        </p>
      </RoughNotationGroup>
    </div>
  );
};

const buttonData = [
  {
    href: "./CV-Jérémie-Hérault.pdf",
    text: "Télécharger mon CV",
    icon: <RxDownload />,
    download: true,
    theme: "outline",
  },
  {
    href: "/pages/contact",
    text: "Contactez-moi",
    icon: <IoMailOutline />,
    theme: "hover",
  },
  {
    href: "https://github.com/jeremie-00",
    text: "Github",
    icon: <IoLogoGithub />,
    target: "_blank",
    theme: "hover",
  },
];

const Buttons = () => {
  const isMobile = useIsMobile();
  return (
    <div className="gap-8 flex items-center justify-center max-lg:flex-col max-md:items-center">
      {buttonData.map(
        ({ href, text, icon, download, target, theme }, index) => (
          <Button
            key={index}
            href={href}
            target={target}
            download={download ? text : undefined}
            theme={theme}
            size={isMobile ? "sm" : "md"}
          >
            {icon}
            {text}
          </Button>
        )
      )}
    </div>
  );
};

export function Hero() {
  return (
    <section className="relative w-full h-full flex justify-center py-14 px-4 md:px-20 md:gap-4 ">
      <SectionMarker rotate={0} />
      <div className="flex flex-col items-center md:justify-between max-w-[1440px] w-full h-full md:gap-24 gap-12 p-2">
        <div className="flex flex-col max-md:items-center md:gap-20 gap-8 order-2 md:order-none">
          <GradiantTitle />
          <HighlightedText />
          <Buttons />
        </div>
        <div className="flex w-full h-full items-center justify-center order-1 md:order-none">
          <Avatar />
        </div>
      </div>
      <SectionMarker rotate={180} />
    </section>
  );
}
