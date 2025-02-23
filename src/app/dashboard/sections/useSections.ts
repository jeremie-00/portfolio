import {
  createSection,
  deleteSection,
  updateSection,
} from "@/app/services/sections.actions";

import { SectionType } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useSections = createResourceCrud<SectionType>(
  "sections",
  createSection,
  updateSection,
  deleteSection
);
