"use client";

import { Button } from "@/app/components/buttons/buttons";
import { SlideShow } from "@/app/components/carousel";
import Collaps from "@/app/components/collaps";
import { Container } from "@/app/components/containers";
import { ParticlesBackground } from "@/app/components/particles";
import { useIsMobile } from "@/app/hooks/useMobile";
import { getProjetById, ProjetProps } from "@/app/services/projets.actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoGlobe, IoLogoGithub } from "react-icons/io5";

export default function Page() {
  const isMobile = useIsMobile();
  const [projet, setProjet] = useState<ProjetProps | null>(null);
  const params = useParams();
  const paramsId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    const fetchProjet = async () => {
      if (paramsId) {
        const data = await getProjetById(paramsId);
        setProjet(data);
      }
    };
    fetchProjet();
  }, [paramsId]);

  if (!projet) {
    return (
      <section className="container flex flex-col items-center justify-center gap-8 py-4">
        <h1 className="text-4xl text-center text-red-500">
          Projet introuvable
        </h1>
      </section>
    );
  }

  return (
    <>
      <ParticlesBackground />
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
                href={link.url}
                className="max-sm:w-full"
                theme="primary"
                size={isMobile ? "sm" : "md"}
                target={link.target || "_blank"}
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

          {projet && projet.image?.medias && projet.image.medias.length > 0 ? (
            <SlideShow
              pictures={projet?.image.medias.map((media) => media.url)}
            />
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
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Collaps>
          </div>
        </Container>
      </section>
    </>
  );
}
