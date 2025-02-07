"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import prisma from "../lib/prisma";
import { Result } from "../types/globalType";

export const isRevokedToken = async (token: string): Promise<boolean> => {
  try {
    const revokedToken = await prisma.revokedToken.findUnique({
      where: {
        token,
      },
    });
    return revokedToken !== null;
  } catch {
    return false;
  }
};

export const createRevokedToken = async (token: string): Promise<void> => {
  try {
    await prisma.revokedToken.create({
      data: {
        token,
      },
    });
  } catch {
    return;
  }
};

export const deleteOldRevokedTokens = async (): Promise<Result> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      data: {
        success: false,
        status: "error",
        message: "Vous devez être connecté pour accéder à cette page.",
      },
    };
  }

  if (session.accessToken) {
    const token = session.accessToken;
    const isRevoked = await isRevokedToken(token);
    if (isRevoked) {
      return {
        data: {
          success: false,
          status: "error",
          message: "Veuillez vous reconnecter pour accéder à cette page.",
        },
      };
    }
  }

  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - 31);

  try {
    const result = await prisma.revokedToken.deleteMany({
      where: {
        createdAt: {
          lt: dateThreshold,
        },
      },
    });

    if (result.count === 0) {
      return {
        data: {
          success: false,
          status: "warn",
          message: "Aucun jeton révoqué a supprimé.",
        },
      };
    }

    return {
      data: {
        success: true,
        status: "success",
        message: `${
          result.count > 1
            ? `${result.count} jetons révoqués supprimés`
            : "1 jeton révoqué supprimé"
        } avec succès ! 🚀`,
      },
    };
  } catch {
    return {
      data: {
        success: false,
        status: "error",
        message:
          "Erreur lors de la suppression des jetons révoqués vieux de plus de 30 jours",
      },
    };
  }
};
