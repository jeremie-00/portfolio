"use client";
import Image from "next/image";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useSwipeable } from "react-swipeable";
import { Button } from "./buttons/buttons";

export function SlideShow({ pictures }: { pictures: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Conteneur principal avec les gestionnaires de balayage */}
      <div
        {...handlers}
        className="relative overflow-hidden aspect-slider shadow-custom w-full h-full m-auto flex items-center justify-center border border-border rounded-xl"
      >
        {/* Conteneur des images */}
        <div
          className="flex transition-transform duration-500 ease-in-out w-full h-full"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            width: `${pictures.length * 100}%`,
          }}
        >
          {pictures.map((picture, index) => (
            <Image
              key={index}
              className="w-full h-full object-cover rounded-xl flex-shrink-0"
              src={picture}
              alt={`image ${index}`}
              width={1400}
              height={600}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex items-center justify-center gap-12">
        <Button
          theme="icon"
          className={pictures.length <= 1 ? "hidden" : "cursor-pointer"}
          onClick={handlePrev}
          ariaLabel="Précédent"
        >
          <IoChevronBack className="text-primary" />
        </Button>
        <span
          className={
            pictures.length <= 1
              ? "hidden"
              : "bg-section text-foreground shadow-md text-center rounded-lg px-3 py-1 text-md font-semibold"
          }
        >
          {activeIndex + 1} / {pictures.length}
        </span>
        <Button
          theme="icon"
          className={pictures.length <= 1 ? "hidden" : "cursor-pointer"}
          onClick={handleNext}
          ariaLabel="Suivant"
        >
          <IoChevronForward className="text-primary" />
        </Button>
      </div>
    </div>
  );
}
