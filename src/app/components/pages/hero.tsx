"use client";
import { useIsMobile } from "@/app/hooks/useMobile";

import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import { RoughNotation, RoughNotationGroup, types } from "react-rough-notation";

import { FullAvatar, NotationType, SectionType } from "@/app/types/prismaType";
import { Avatar } from "../avatar";
import { Button } from "../buttons/buttons";
import { Container, Content } from "../containers";
import SectionMarker from "../sectionMarker";

const UnderlineText = ({
  textsNotation,
}: {
  textsNotation: NotationType[];
}) => {
  const isMobile = useIsMobile();
  const color = "#6366F1";

  return (
    <RoughNotationGroup show={true}>
      <p className="p">
        {textsNotation?.map(({ order, type, textNotation, text }, index) => (
          <span key={index}>
            {textNotation && (
              <RoughNotation
                order={order}
                type={type as types}
                color={color}
                animate={true}
                animationDelay={1000}
                strokeWidth={2}
                padding={
                  type !== "circle"
                    ? [0, 0]
                    : type === "circle" && isMobile
                    ? [5, 20]
                    : [10, 25]
                }
                multiline={true}
              >
                {textNotation}
              </RoughNotation>
            )}
            {text}
          </span>
        ))}
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

export function Hero({
  avatar,
  section,
  textsNotation,
}: {
  avatar: FullAvatar | null;
  section: SectionType | null;
  textsNotation?: NotationType[];
}) {
  return (
    <section className="section justify-center">
      <SectionMarker rotate={0} />
      <Container>
        <Content>
          <h1 className="h1">{section && section.title}</h1>
          {textsNotation ? (
            <>
              <UnderlineText textsNotation={textsNotation} />
              <Buttons />
            </>
          ) : (
            <p className="p"> {section && section.text} </p>
          )}
        </Content>

        <Content>
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
