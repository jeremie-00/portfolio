"use client";
import { Container, Content } from "../../containers";

import { useIsMobile } from "@/app/hooks/useMobile";
import { AboutProps } from "@/app/services/about.actions";
import { SectionType } from "@/app/types/prismaType";
import { ChatBull, ChatBullProps } from "../../ChatBull";

export default function About({
  section,
  about,
}: {
  section: SectionType;
  about: AboutProps;
}) {
  const isMobile = useIsMobile();
  const positionArrow: ChatBullProps["arrowPosition"][] = isMobile
    ? ["middleBottomLeft", "middleBottomRight"]
    : ["bottomLeft", "bottomRight"];

  return (
    <section className="section flex-col justify-center items-center">
      <Container>
        <h2 className="h2">{section.title}</h2>
        <div className="bg-image-svg rounded-xl">
          <Content className="md:p-16 p-4 rounded-xl border-primary/50 border bg-background/20">
            {about.texts.map((text, index) => (
              <ChatBull
                key={index}
                text={text}
                image={about.image}
                arrowPosition={
                  index % 2 === 0 ? positionArrow[0] : positionArrow[1]
                }
                positionGrid={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </Content>
        </div>
      </Container>
    </section>
  );
}
