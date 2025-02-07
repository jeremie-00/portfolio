import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const links = [
  { href: "/", title: "Accueil", page: "accueil", order: 1 },
  { href: "/pages/projet", title: "Mes Projets", page: "projet", order: 2 },
  { href: "/pages/contact", title: "Me contacter", page: "contact", order: 3 },
  { href: "/login", title: "Connexion", page: "login", order: 4 },
  { href: "/pages/legal", title: "Mention légale", page: "legal", order: 5 },
];

async function main() {
  console.log("Seeding links database...");

  for (const link of links) {
    const { page, order, title, href } = link;

    await prisma.link.create({
      data: {
        page: page,
        order: order,
        title: title,
        href: href,
      },
    });
  }

  console.log("Seeding links complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
