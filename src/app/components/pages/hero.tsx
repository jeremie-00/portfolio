"use client";
import { useIsMobile } from "@/app/hooks/useMobile";

import { useParams, usePathname } from "next/navigation";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

import { AvatarProps, getAvatarById } from "@/app/services/avatar.actions";
import { getTextsHeroById } from "@/app/services/textHero.actions";
import { useEffect, useState } from "react";
import { Avatar } from "../avatar";
import { Button } from "../buttons/buttons";
import { Container, Content } from "../containers";
import SectionMarker from "../sectionMarker";

const UnderlineText = () => {
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
    href: "/pages/2",
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
  let paramsId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  paramsId = paramsId === undefined ? "acceuil" : paramsId;

  const [avatar, setAvatar] = useState<AvatarProps>();
  const [titleHero, setTitleHero] = useState<string>();
  const [textHero, setTextHero] = useState<string>();

  useEffect(() => {
    const fetchDatas = async () => {
      const avatar = await getAvatarById(paramsId);
      setAvatar(avatar);

      const textsHero = await getTextsHeroById(paramsId);
      setTitleHero(textsHero.title);
      setTextHero(textsHero.text);
    };
    fetchDatas();
  }, [paramsId]);

  return (
    <section className="section justify-center">
      <SectionMarker rotate={0} />
      <Container>
        <Content className="">
          <h1 className="h1">{titleHero}</h1>
          {isHomePage ? (
            <>
              <UnderlineText />
              <Buttons />
            </>
          ) : (
            <p className="p"> {textHero} </p>
          )}
        </Content>

        <Content className="">
          {avatar && (
            <Avatar
              imgRecto={avatar.recto}
              imgVerso={avatar.verso}
              textBull={avatar.text}
              arrowBullPosition={avatar.arrowBullPosition}
            />
          )}
        </Content>
      </Container>
      <SectionMarker rotate={180} />
    </section>
  );
}
