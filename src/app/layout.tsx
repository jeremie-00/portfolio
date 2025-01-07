import { ThemeProvider } from "@/app/components/buttons/themeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/header/header";
import Footer from "./components/pages/footer";
import { StairTransition } from "./components/transitionPages/stairTransition";
import { Transitions } from "./components/transitionPages/transitions";
import "./globals.css";
const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Header />
          <main className="flex min-h-svh flex-col items-center">
            <StairTransition />
            <Transitions>{children}</Transitions>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
