import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const links = [
  { href: "/", title: "Accueil", page: "accueil", order: 1, inNav: true },
  {
    href: "/pages/projet",
    title: "Mes Projets",
    page: "projet",
    order: 2,
    inNav: true,
  },
  {
    href: "/pages/contact",
    title: "Me contacter",
    page: "contact",
    order: 3,
    inNav: true,
  },
  { href: "/login", title: "Connexion", page: "login", order: 4, inNav: true },
  {
    href: "/pages/legal",
    title: "Mention légale",
    page: "legal",
    order: 5,
    inNav: false,
  },
];

async function main() {
  console.log("Seeding links database...");

  for (const link of links) {
    const { page, order, title, href, inNav } = link;

    await prisma.link.create({
      data: {
        page: page,
        order: order,
        title: title,
        href: href,
        inNav: inNav,
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
