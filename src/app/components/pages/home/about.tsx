import { Container, Content } from "../../containers";

import { ChatBull } from "../../ChatBull";
import { getAbout } from "@/app/services/about.actions";
import { useState, useEffect } from "react";

export default function About() {
  const [texts, setTexts] = useState<string[]>([]);
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
                arrowPosition={index % 2 === 0 ? "bottomLeft" : "bottomRight"}
                positionGrid={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </Content>
        </div>
      </Container>
    </section>
  );
}
