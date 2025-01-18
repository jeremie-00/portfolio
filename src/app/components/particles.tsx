"use client";
import { useParticlesContext } from "@/app/providers/particlesProvider";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export const ParticlesBackground = () => {
  const { resolvedTheme } = useTheme();
  const { speed } = useParticlesContext();
  const particlesContainer = useRef<Container | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      particlesContainer.current = container || null;
    },
    []
  );

  useEffect(() => {
    // Quand la vitesse change, mets à jour la vitesse des particules
    if (particlesContainer.current) {
      particlesContainer.current.options.particles.move.speed = speed;
      particlesContainer.current.refresh();
    }
  }, [speed]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: resolvedTheme === "dark" ? "#000" : "#ffffff",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#6366F1",
          },
          /* links: {
            color: resolvedTheme === "dark" ? "#ffffff" : "#000",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          }, */
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: speed,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 25,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
