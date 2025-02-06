import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { isRevokedToken } from "../services/revokedToken.actions";
import { Prisma } from "@prisma/client";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient();

export const authActionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }
    // Gérer les erreurs Prisma ou autres erreurs spécifiques
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Gérer d'autres erreurs Prisma
      switch (error.code) {
        case "P2002":
          return `Le champ ${error?.meta?.target} existe déjà.`;
        case "P2000":
          return `Erreur de validation de la base de données`;
        case "P2025":
          return `Enregistrement non trouvé`;
        case "P2023":
          return `Erreur de relation entre les tables`;
        default:
          return `Erreur Prisma : ${error.message}`;
      }
    }
    return "Oh no, generic error";
  },
}).use(async ({ next }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new ActionError(
      "Vous devez être connecté pour accéder à cette page."
    );
  }

  if (session.accessToken) {
    const token = session.accessToken;
    const isRevoked = await isRevokedToken(token);
    if (isRevoked) {
      throw new ActionError(
        "Veuillez vous reconnecter pour accéder à cette page."
      );
    }
  }
  return next();
});
