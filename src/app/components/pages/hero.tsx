"use client";
import { useIsMobile } from "@/app/hooks/useMobile";
import { useParams, usePathname } from "next/navigation";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { Avatar } from "../avatar";
import { Button } from "../buttons/buttons";
import { Container, Content } from "../containers";
import SectionMarker from "../sectionMarker";

const titlePages: Record<string, string> = {
  "0": "Développeur Web",
  "1": "Découvrez mes réalisations",
  "2": "Mon parcours",
  "3": "Me contacter",
};

const textPages: Record<string, string> = {
  "1": "Explorez mes projets et plongez dans mes créations uniques.",
  "2": "Voici mon parcours professionnel",
  "3": "Contactez-moi",
};

const HighlightedText = () => {
  const isMobile = useIsMobile();
  return (
    <RoughNotationGroup show={true}>
      <p className="p">
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
  const params = useParams();
  const isHomePage = usePathname() === "/";
  let paramsId = Array.isArray(params?.id) ? params.id[0] : params.id;
  paramsId = paramsId === undefined ? "0" : paramsId;
  const pageTitle = titlePages[paramsId] ?? "Page introuvable";
  const pageText = textPages[paramsId] ?? "La page demandée n'existe pas.";

  return (
    <section className="section justify-center">
      <SectionMarker rotate={0} />
      <Container>
        <Content className="order-2 md:order-none">
          <h1 className="h1">{pageTitle}</h1>
          {isHomePage ? (
            <>
              <HighlightedText />
              <Buttons />
            </>
          ) : (
            <p className="p"> {pageText} </p>
          )}
        </Content>

        {isHomePage ? (
          <Content className="order-1 md:order-none">
            <Avatar />
          </Content>
        ) : null}
      </Container>
      <SectionMarker rotate={180} />
    </section>
  );
}
