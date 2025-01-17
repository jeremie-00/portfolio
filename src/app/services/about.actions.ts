export interface AboutProps {
  texts: string[];
  image: string;
}
const image = "/profile/profilepicApropos.png";

const texts = [
  `Ancien électrotechnicien reconverti en développeur web.`,
  `Je suis passionné par la création d'interfaces modernes et performantes.`,
  `Rigoureux, organisé et toujours enquête d'apprentissage.`,
  `Je mets à profit mes compétences techniques pour répondre aux besoins des utilisateurs.`,
];

export const getAbout = async (): Promise<AboutProps> => {
  // Simulez un appel à une base de données
  return new Promise((resolve) => {
    setTimeout(() => resolve({ texts, image }), 100); // Simule une latence
  });
};
