"use client";

import { Hero } from "./components/pages/hero";
import About from "./components/pages/home/about";
import Skills from "./components/pages/home/skills";
import { ParticlesBackground } from "./components/particles";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Hero />
      <Skills />
      <About />
    </>
  );
}
