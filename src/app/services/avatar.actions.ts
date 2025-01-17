export interface AvatarProps {
  recto: string;
  verso: string;
  text: string;
  arrowBullPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "middleTopLeft"
    | "middleTopRight"
    | "middleBottomLeft"
    | "middleBottomRight";
}

const dataAvatar: Record<string, AvatarProps> = {
  acceuil: {
    recto: "/profile/profilepicPc.png",
    verso: "/profile/profilepicHandUp.png",
    text: "Bienvenue ! 😎",
    arrowBullPosition: "middleTopLeft",
  },
  projet: {
    recto: "/profile/profilepicPc.png",
    verso: "/profile/profilepicThumbUp.png",
    text: "Bonne exploration ! 🚀",
    arrowBullPosition: "middleTopRight",
  },
  contact: {
    recto: "/profile/profilepicPc.png",
    verso: "/profile/profilepicPhone.png",
    text: "A bientôt ! 🙂",
    arrowBullPosition: "middleTopRight",
  },
};

export const getAvatarById = async (id: string): Promise<AvatarProps> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dataAvatar[id]), 100); // Simule une latence
  });
};
