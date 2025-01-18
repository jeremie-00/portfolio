import { ThemeProvider } from "@/app/providers/themeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/header";
import Footer from "./components/pages/footer";
import { StairTransition } from "./components/transitionPages/stairTransition";
import { Transitions } from "./components/transitionPages/transitions";
import "./globals.css";
import { ParallaxProviders } from "./providers/parallaxProvider";
import { ParticlesProvider } from "./providers/particlesProvider";
const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio de Jérémie Hérault | Développeur Web Full-Stack",
  description:
    "Explorez le portfolio de Jérémie Hérault, développeur web spécialisé en React, Next.js et TailwindCSS. Découvrez des projets modernes, interactifs et performants.",
  keywords: [
    "développeur web",
    "portfolio développeur",
    "React",
    "Next.js",
    "TailwindCSS",
    "Jérémie Hérault",
    "applications web",
    "développement front-end",
    "développement back-end",
  ],

  authors: [{ name: "Jérémie Hérault" }],
  robots: "index, follow",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },

  manifest: "/site.webmanifest",
  other: {
    "Content-Language": "fr-FR",
    "geo.region": "FR-60",
    "geo.placename": "Neuilly-en-Thelle",
    "geo.position": "49.2273;2.2486",
    ICBM: "49.2273, 2.2486",
  },
  openGraph: {
    title: "Portfolio de Jérémie Hérault | Développeur Web Full-Stack",
    description:
      "Découvrez les réalisations de Jérémie Hérault, développeur web passionné.",
    url: "https://jh-tech.fr/",
    siteName: "Portfolio de Jérémie Hérault",
    images: [
      {
        url: "https:/jh-tech.fr/profilepicPc.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio de Jérémie Hérault",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} relative antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ParticlesProvider>
            <Header />
            <main className="flex min-h-svh flex-col items-center">
              <StairTransition />
              <Transitions>
                <ParallaxProviders>{children}</ParallaxProviders>
                <SpeedInsights />
              </Transitions>
            </main>

            <Footer />
          </ParticlesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
