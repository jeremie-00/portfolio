import {
  createAvatar,
  deleteAvatar,
  updateAvatar,
} from "@/app/services/avatar.actions";
import { FullAvatar } from "@/app/types/prismaType";
import { createResourceCrud } from "../stateManagement/createResourceCrud";

export const useAvatar = createResourceCrud<FullAvatar>(
  "avatar",
  createAvatar,
  updateAvatar,
  deleteAvatar
);
