"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ParticlesContextType = {
  speed: number;
  setSpeed: (newSpeed: number) => void;
};

const ParticlesContext = createContext<ParticlesContextType | undefined>(
  undefined
);

export const useParticlesContext = () => {
  const context = useContext(ParticlesContext);
  if (!context) {
    throw new Error(
      "useParticlesContext must be used within a ParticlesProvider"
    );
  }
  return context;
};

export const ParticlesProvider = ({ children }: { children: ReactNode }) => {
  const [speed, setSpeed] = useState(2); // Vitesse par défaut

  return (
    <ParticlesContext.Provider value={{ speed, setSpeed }}>
      {children}
    </ParticlesContext.Provider>
  );
};
