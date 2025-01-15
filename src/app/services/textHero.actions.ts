const titlePages: Record<string, string> = {
  acceuil: "Développeur Web",
  projet: "Découvrez mes réalisations",
  contact: "Contactez-moi",
};

const textPages: Record<string, string> = {
  projet: "Explorez mes projets et plongez dans mes créations uniques.",
  contact:
    "Les informations que vous soumettez via ce formulaire sont uniquement utilisées pour vous répondre. Elles ne sont pas enregistrées dans une base de données et ne seront pas transmises à des tiers.",
};

export const getTextsHeroById = async (
  id: string
): Promise<Record<string, string>> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ title: titlePages[id], text: textPages[id] }),
      100
    ); // Simule une latence
  });
};
