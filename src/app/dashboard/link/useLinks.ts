import {
  createLink,
  deleteLink,
  updateLink,
} from "@/app/services/link.actions";
import { FullLink } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useLinks = createResourceCrud<FullLink>(
  "links",
  createLink,
  updateLink,
  deleteLink
);
