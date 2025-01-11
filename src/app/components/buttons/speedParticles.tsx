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
    <div className="relative z-20 flex flex-col items-center justify-center gap-4 mb-4">
      <div className="flex items-center gap-4">
        <Button
          theme="icon"
          onClick={() => handleSpeedChange(Math.min(15, speed + 1))}
          disabled={speed === 15}
        >
          <IoChevronUp />
        </Button>
        <Button
          theme="icon"
          onClick={() => handleSpeedChange(Math.max(0, speed - 1))} // Vitesse minimale de 1
          disabled={speed === 0}
        >
          <IoChevronDown />
        </Button>
      </div>
      Vitesse particules : {speed}
    </div>
  );
}
