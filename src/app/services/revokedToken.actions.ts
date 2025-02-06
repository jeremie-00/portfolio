"use server";

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
          status: "warn",
          message: "Aucun jeton révoqué a supprimé.",
        },
      };
    }

    return {
      data: {
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
        status: "error",
        message:
          "Erreur lors de la suppression des jetons révoqués vieux de plus de 30 jours",
      },
    };
  }
};
