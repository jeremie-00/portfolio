"use client";

import { Button } from "@/app/components/buttons/buttons";
import { SlideShow } from "@/app/components/carousel";
import Collaps from "@/app/components/collaps";
import { Container } from "@/app/components/containers";
import { useProjets } from "@/app/dashboard/projet/useProjets";
import { useIsMobile } from "@/app/hooks/useMobile";
import { useParams } from "next/navigation";
import { IoGlobe, IoLogoGithub } from "react-icons/io5";

export default function Page() {
  const isMobile = useIsMobile();
  const params = useParams();
  const paramsId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { datas: projets } = useProjets();
  const projet = projets.find((projet) => projet.id === paramsId);

  if (!projet) {
    return (
      <section className="container flex flex-col items-center justify-center gap-8 py-4">
        <h1 className="error text-xl">Projet introuvable</h1>
      </section>
    );
  }

  return (
    <>
      <section className="section flex-col items-center justify-center gap-8">
        <Container>
          <div>
            <h2 className="p">Bienvenue sur le projet</h2>
            <h1 className="h1">{projet.title}</h1>
          </div>

          <div className="flex gap-8 items-center justify-center flex-col sm:flex-row">
            {projet?.links?.map((link) => (
              <Button
                key={link.id}
                href={link.href}
                className="max-sm:w-full"
                theme="primary"
                size={isMobile ? "sm" : "md"}
                target="_blank"
              >
                {link.title === "GitHub" ? (
                  <IoLogoGithub size={24} />
                ) : (
                  <IoGlobe size={24} />
                )}
                {link.title}
              </Button>
            ))}
          </div>

          {projet && projet.medias && projet.medias.length > 0 ? (
            <SlideShow pictures={projet?.medias.map((media) => media.url)} />
          ) : (
            <p className="text-3xl text-center">
              Oups, pas la moindre image à l&apos;horizon ! 😔
            </p>
          )}
          <div className="w-full flex flex-col sm:flex-row gap-4 rounded-b-lg">
            <Collaps title={"Description"}>
              <p> {projet.longDesc} </p>
            </Collaps>
            <Collaps title={"Skills"}>
              <ul>
                {projet?.skills?.map((skill) => (
                  <li key={skill.id}>{skill.title}</li>
                ))}
              </ul>
            </Collaps>
          </div>
        </Container>
      </section>
    </>
  );
}
