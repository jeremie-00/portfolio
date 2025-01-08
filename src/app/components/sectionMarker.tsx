import { JSX } from "react";

interface SectionMarkerProps {
  rotate: number;
}

export default function SectionMarker({
  rotate,
}: SectionMarkerProps): JSX.Element {
  return (
    <div
      className={`flex flex-col items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5 max-md:hidden`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-5 h-5 rounded-full bg-primary" />
      <div className="w-1 h-1/2 bg-gradient-to-b from-primary" />
    </div>
  );
}
