import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const datas = await prisma.projet.findMany({
      include: { skills: true, links: true, cover: true, medias: true },
    });
    return NextResponse.json(datas, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des projets",
        error,
      },
      { status: 500 }
    );
  }
}
