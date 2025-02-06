import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sections: Record<string, { title: string; text?: string }> = {
  accueil: {
    title: "Développeur Web",
  },
  projet: {
    title: "Découvrez mes réalisations",
    text: "Explorez mes projets et plongez dans mes créations uniques.",
  },
  contact: {
    title: "Contactez-moi",
    text: "Les informations que vous soumettez via ce formulaire sont uniquement utilisées pour vous répondre. Elles ne sont pas enregistrées dans une base de données et ne seront pas transmises à des tiers.",
  },
  skill: {
    title: "Mes compétences",
    text: "Découvrez les outils et technologies que j'utilise pour donner vie à mes projets, en combinant créativité et expertise technique.",
  },
  about: {
    title: "À propos de moi",
  },
};

async function main() {
  console.log("Seeding sections database...");

  for (const [section, { title, text }] of Object.entries(sections)) {
    await prisma.section.create({
      data: {
        section: section,
        title: title,
        text: text,
      },
    });
  }

  console.log("Seeding sections complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
