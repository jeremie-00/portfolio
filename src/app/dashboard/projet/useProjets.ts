import {
  createProjet,
  deleteProjet,
  updateProjet,
} from "@/app/services/projets.actions";
import { FullProjet } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useProjets = createResourceCrud<FullProjet>(
  "projets",
  createProjet,
  updateProjet,
  deleteProjet
);
