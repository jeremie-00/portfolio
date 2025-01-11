import { Container, Content } from "../../containers";

import { ChatBull } from "../../ChatBull";

const texts = [
  `Ancien électrotechnicien reconverti en développeur web.`,
  `Je suis passionné par la création d'interfaces modernes et performantes.`,
  `Rigoureux, organisé et toujours enquête d'apprentissage.`,
  `Je mets à profit mes compétences techniques pour répondre aux besoins des utilisateurs.`,
];

export default function About() {
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
