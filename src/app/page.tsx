"use client";
import { Hero } from "./components/pages/home/hero";
import Skills from "./components/pages/home/skills";
import { ParticlesBackground } from "./components/particles";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Hero />
      <Skills />
      <section className="relative mt-20"></section>
    </>
  );
}
