import prisma from "@/app/lib/prisma"; // Assure-toi que le chemin est correct
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération des liens", error },
      { status: 500 }
    );
  }
}
