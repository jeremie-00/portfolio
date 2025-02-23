import { Prisma } from "@prisma/client";

/* export type FullProject = Prisma.ProjectGetPayload<{
  include: {
    skills: true;
    links: true;
    cover: true;
    medias: true;
  };
}>; */

export type FullSkill = Prisma.SkillGetPayload<{
  include: {
    image: true;
  };
}>;

export type FullAbout = Prisma.AboutGetPayload<{
  include: {
    image: true;
  };
}>;

export type FullAvatar = Prisma.AvatarGetPayload<{
  include: {
    recto: true;
    verso: true;
  };
}>;
export type FullProjet = Prisma.ProjetGetPayload<{
  include: {
    skills: true;
    links: true;
    cover: true;
    medias: true;
  };
}>;

export type ProjetData = {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  cover?: File;
  medias: File[];
  skills: string[];
  links: {
    id?: string;
    url: string;
    title: string;
    inNav?: string;
    iconId?: string;
    isAdmin?: string;
    type?: string;
    target?: string;
    projectId?: string;
    order?: number;
  }[];
};

export type FullLink = Prisma.LinkGetPayload<true>;

export type ImageType = Prisma.ImageGetPayload<true>;

export type NotationType = Prisma.TextNotationGetPayload<true>;

export type SectionType = Prisma.SectionGetPayload<true>;

/* export type TitleType = Prisma.TitlePageGetPayload<true>;
export type TextType = Prisma.TextPageGetPayload<true>; */

/* export type FullLink = Prisma.LinkGetPayload<{
  include: {
    icon: true;
    project: true;
    image: true;
  };
}>;

export type FullIcon = Prisma.IconGetPayload<{
  include: {
    Link: true;
  };
}>;

export type FullSectionPage = Prisma.SectionPageGetPayload<{
  include: {
    images: true;
    titles: true;
    contents: true;
  };
}>;

export type FullImageFile = Prisma.ImageFileGetPayload<{
  include: {
    skill: true;
    coverProject: true;
    mediasProject: true;
    SectionPage: true;
  };
}>;

export type ActionPrismaResponse = {
  success?: string;
  error?: string;
}; */
