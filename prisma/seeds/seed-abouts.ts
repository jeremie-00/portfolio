import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const abouts = [
  {
    id: "1",
    text: "Ancien électrotechnicien reconverti en développeur web.",
    order: 1,
    image: {
      id: "1",
      url: "/profile/profilepicApropos.png",
      alt: "Memoji de profil de l'utilisateur",
    },
  },
  {
    id: "2",
    text: "Je suis passionné par la création d'interfaces modernes et performantes.",
    order: 2,
    image: {
      id: "1",
      url: "/profile/profilepicApropos.png",
      alt: "Memoji de profil de l'utilisateur",
    },
  },
  {
    id: "3",
    text: "Rigoureux, organisé et toujours enquête d'apprentissage.",
    order: 3,
    image: {
      id: "1",
      url: "/profile/profilepicApropos.png",
      alt: "Memoji de profil de l'utilisateur",
    },
  },
  {
    id: "4",
    text: "Je mets à profit mes compétences techniques pour répondre aux besoins des utilisateurs.",
    order: 4,
    image: {
      id: "1",
      url: "/profile/profilepicApropos.png",
      alt: "Memoji de profil de l'utilisateur",
    },
  },
];
async function main() {
  console.log("Seeding abouts database...");

  for (const about of abouts) {
    const { order, text, image } = about;
    await prisma.about.create({
      data: {
        order: Number(order),
        text: text,
        image: {
          create: {
            url: image.url,
            alt: "Memoji de profil de l'utilisateur",
          },
        },
      },
      include: {
        image: true,
      },
    });
  }

  console.log("Seeding abouts complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
