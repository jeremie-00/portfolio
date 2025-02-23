import prisma from "@/app/lib/prisma"; // Assure-toi que le chemin est correct
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const datas = await prisma.about.findMany({
      orderBy: { order: "asc" },
      include: { image: true },
    });

    return NextResponse.json(datas, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération", error },
      { status: 500 }
    );
  }
}
