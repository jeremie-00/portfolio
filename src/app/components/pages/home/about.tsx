import { Container, Content } from "../../containers";

import { useIsMobile } from "@/app/hooks/useMobile";
import { getAbout } from "@/app/services/about.actions";
import { useEffect, useState } from "react";
import { ChatBull, ChatBullProps } from "../../ChatBull";

export default function About() {
  const [texts, setTexts] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const positionArrow: ChatBullProps["arrowPosition"][] = isMobile
    ? ["middleBottomLeft", "middleBottomRight"]
    : ["bottomLeft", "bottomRight"];
  useEffect(() => {
    const fetchTexts = async () => {
      const about = await getAbout();
      setTexts(about.texts);
    };
    fetchTexts();
  }, []);
  return (
    <section className="section flex-col justify-center items-center">
      <Container>
        <h2 className="h2">A propos de moi</h2>
        <div className="bg-image-svg rounded-xl">
          <Content className="md:p-16 p-4 rounded-xl border-primary/50 border bg-background/20">
            {texts.map((text, index) => (
              <ChatBull
                key={index}
                text={text}
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
