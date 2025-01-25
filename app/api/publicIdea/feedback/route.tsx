import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  if (!ideaId) return NextResponse.json({ isError: true, message: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });

  const { feedback } = await request.json();

  try {
    await prisma.feedbackRecord.upsert({
      where: {
        id: ideaId,
      },
      update: {
        feedback,
      },
      create: {
        ideaId,
        feedback,
      },
    });
    return NextResponse.json({ isError: false, message: "success" });
  } catch (error) {
    return handlePrismaError(error);
  }
}
