import {
  createTextNotation,
  deleteTextNotation,
  updateTextNotation,
} from "@/app/services/textNotation.actions";
import { NotationType } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useNotation = createResourceCrud<NotationType>(
  "notations",
  createTextNotation,
  updateTextNotation,
  deleteTextNotation
);
