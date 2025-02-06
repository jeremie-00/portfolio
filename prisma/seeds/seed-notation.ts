import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const textNotation = [
  {
    page: "accueil",
    order: 1,
    type: "underline",
    textNotation: "Créateur de site web",
    text: ", je conçois et développe des applications web modernes,",
  },
  {
    page: "accueil",
    order: 2,
    type: "highlight",
    textNotation: "dynamiques et performantes",
    text: ", du design au déploiement, avec une attention particulière pour ",
  },
  {
    page: "accueil",
    order: 3,
    type: "underline",
    textNotation: "l'expérience utilisateur.",
  },
];

async function main() {
  console.log("Seeding notations database...");

  for (const texts of textNotation) {
    const { page, order, type, textNotation, text } = texts;

    await prisma.textNotation.create({
      data: {
        page: page,
        order: order,
        type: type,
        textNotation: textNotation,
        text: text,
      },
    });
  }

  console.log("Seeding notations complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
