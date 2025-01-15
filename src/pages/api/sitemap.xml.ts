import { getProjets, ProjetProps } from "@/app/services/projets.actions";
// Importez votre fonction pour récupérer les projets
import { NextApiRequest, NextApiResponse } from "next";

// Fonction pour générer le sitemap
const generateSitemap = (baseUrl: string, projets: ProjetProps[]) => {
  const staticUrls = [
    { loc: "/", lastmod: "2025-01-01", changefreq: "daily", priority: 1.0 },
    {
      loc: "/pages/projet",
      lastmod: "2025-01-01",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "/pages/contact",
      lastmod: "2025-01-01",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/pages/legal",
      lastmod: "2025-01-01",
      changefreq: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamically add URLs for each project
  const dynamicUrls = projets.map((projet) => ({
    loc: `/pages/projet/${projet.id}`,
    lastmod: "2025-01-01", // Mettez à jour avec la vraie date de mise à jour de chaque projet
    changefreq: "weekly",
    priority: 0.8,
  }));

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return sitemap;
};

// API handler pour servir le sitemap
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Vous pouvez définir cette URL dans votre .env
  const projets = await getProjets(); // Récupérez les projets

  const sitemap = generateSitemap(baseUrl, projets);

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
