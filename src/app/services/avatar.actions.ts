import { StaticImageData } from "next/image";
import profilepicHandUp from "../assets/profilepicHandUp.png";
import profilepicPc from "../assets/profilepicPc.png";
import profilepicPhone from "../assets/profilepicPhone.png";
import profilepicThumbUp from "../assets/profilepicThumbUp.png";

export interface AvatarProps {
  recto: StaticImageData;
  verso: StaticImageData;
  text: string;
  arrowBullPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

const dataAvatar: Record<string, AvatarProps> = {
  acceuil: {
    recto: profilepicPc,
    verso: profilepicHandUp,
    text: "Bienvenue ! 😎",
    arrowBullPosition: "topLeft",
  },
  projet: {
    recto: profilepicPc,
    verso: profilepicThumbUp,
    text: "Bonne exploration ! 🚀",
    arrowBullPosition: "topRight",
  },
  contact: {
    recto: profilepicPc,
    verso: profilepicPhone,
    text: "A bientôt ! 🙂",
    arrowBullPosition: "topRight",
  },
};

export const getAvatarById = async (id: string): Promise<AvatarProps> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dataAvatar[id]), 100); // Simule une latence
  });
};
