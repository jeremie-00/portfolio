import {
  createSkill,
  deleteSkill,
  updateSkill,
} from "@/app/services/skills.actions";
import { FullSkill } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useSkills = createResourceCrud<FullSkill>(
  "skills",
  createSkill,
  updateSkill,
  deleteSkill
);
