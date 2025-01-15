const titlePages: Record<string, string> = {
  "0": "Développeur Web",
  "1": "Découvrez mes réalisations",
  "2": "Contactez-moi",
};

const textPages: Record<string, string> = {
  "1": "Explorez mes projets et plongez dans mes créations uniques.",
  "2": "Les informations que vous soumettez via ce formulaire sont uniquement utilisées pour vous répondre. Elles ne sont pas enregistrées dans une base de données et ne seront pas transmises à des tiers.",
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
