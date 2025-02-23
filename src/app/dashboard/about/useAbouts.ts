import {
  createAbout,
  deleteAbout,
  updateAbout,
} from "@/app/services/about.actions";
import { createResourceCrud } from "../stateManagement/createResourceCrud";
import { FullAbout } from "@/app/types/prismaType";

export const useAbout = createResourceCrud<FullAbout>(
  "about",
  createAbout,
  updateAbout,
  deleteAbout
);
