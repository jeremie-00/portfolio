"use client";
import { Container, Content } from "../../containers";

import { useIsMobile } from "@/app/hooks/useMobile";
import { FullAbout, SectionType } from "@/app/types/prismaType";
import { ChatBull, ChatBullProps } from "../../ChatBull";

export default function About({
  section,
  abouts,
}: {
  section: SectionType;
  abouts: FullAbout[];
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
            {abouts.map((about, index) => (
              <ChatBull
                key={index}
                text={about.text}
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
