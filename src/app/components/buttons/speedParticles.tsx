"use client";
import { useParticlesContext } from "@/app/providers/particlesProvider";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Button } from "./buttons";

export default function SpeedParticles() {
  const { speed, setSpeed } = useParticlesContext();
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="relative z-20 flex items-center justify-center gap-4">
      <p className="text-sm text-foreground text-center">
        {`Vitesse particules : ${speed}`}
      </p>
      <Button
        theme="icon"
        onClick={() => handleSpeedChange(Math.min(15, speed + 1))}
        disabled={speed === 15}
      >
        <IoChevronUp className="text-foreground" />
      </Button>
      <Button
        theme="icon"
        onClick={() => handleSpeedChange(Math.max(0, speed - 1))} // Vitesse minimale de 1
        disabled={speed === 0}
      >
        <IoChevronDown className="text-foreground" />
      </Button>
    </div>
  );
}
