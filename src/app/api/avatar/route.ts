import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const datas = await prisma.avatar.findMany({
      include: { recto: true, verso: true },
    });
    return NextResponse.json(datas, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des avatars",
        error,
      },
      { status: 500 }
    );
  }
}
