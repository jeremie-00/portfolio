import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum ArrowBullPosition {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
  middleTopLeft = "middleTopLeft",
  middleTopRight = "middleTopRight",
  middleBottomLeft = "middleBottomLeft",
  middleBottomRight = "middleBottomRight",
}

const avatar: Record<
  string,
  {
    recto: { url: string; alt: string };
    verso: { url: string; alt: string };
    text: string;
    arrowBullPosition: ArrowBullPosition;
  }
> = {
  accueil: {
    recto: { url: "/profile/profilepicPc.png", alt: "profil pc" },
    verso: { url: "/profile/profilepicHandUp.png", alt: "profil hand up" },
    text: "Bienvenue ! 😎",
    arrowBullPosition: ArrowBullPosition.middleTopLeft,
  },
  projet: {
    recto: { url: "/profile/profilepicPc.png", alt: "profil pc" },
    verso: { url: "/profile/profilepicThumbUp.png", alt: "profil thumb up" },
    text: "Bonne exploration ! 🚀",
    arrowBullPosition: ArrowBullPosition.middleTopRight,
  },
  contact: {
    recto: { url: "/profile/profilepicPc.png", alt: "profil pc" },
    verso: { url: "/profile/profilepicPhone.png", alt: "profil phone" },
    text: "A bientôt ! 🙂",
    arrowBullPosition: ArrowBullPosition.middleTopRight,
  },
};

async function main() {
  console.log("Seeding avtars database...");

  for (const [
    page,
    { recto, verso, text, arrowBullPosition },
  ] of Object.entries(avatar)) {

    await prisma.avatar.create({
      data: {
        page: page,
        text: text,
        arrowBullPosition: arrowBullPosition,
        recto: recto
          ? {
              create: {
                url: recto.url,
                alt: recto.alt,
              },
            }
          : undefined,
        verso: verso
          ? {
              create: {
                url: verso.url,
                alt: verso.alt,
              },
            }
          : undefined,
      },
    });
  }

  console.log("Seeding avtars complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
