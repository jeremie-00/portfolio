"use client";
import { ReactNode, useState } from "react";
import { IoChevronDown, IoMenu } from "react-icons/io5";

export default function Collaps({
  children,
  title,
}: {
  children: ReactNode;
  title: string | undefined;
}) {
  const [active, setActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [roundedBottom, setRoundedBottom] = useState(true);

  const handleToggle = () => {
    if (active) {
      setTimeout(() => {
        setIsCollapsed(true);
        setRoundedBottom(true);
      }, 250);
    } else {
      setRoundedBottom(false);
      setIsCollapsed(false);
    }
    setActive(!active);
  };

  return (
    <div className="w-full">
      {/* Titre cliquable */}
      <div
        className={`flex items-center justify-between bg-section gap-4 p-5 z-20 ${
          roundedBottom ? "rounded-lg" : "rounded-t-lg"
        } cursor-pointer`}
        onClick={handleToggle}
        role="button"
        aria-expanded={active}
      >
        <IoMenu />
        <h2 className="flex-1 font-bold">{title}</h2>
        <IoChevronDown
          className={`transition-transform duration-300 ease-in-out ${
            active ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Contenu dépliable */}
      <div className={`overflow-hidden ${isCollapsed ? "h-0" : "h-auto"}`}>
        <div
          className={`transition-transform duration-300 ease-in-out bg-section rounded-b-lg -z-1 ${
            active ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
