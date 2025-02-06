import { z } from "zod";

export const deleteSchema = z.object({
  id: z.string().nonempty({ message: "Vous devez fournir un identifiant" }),
});
