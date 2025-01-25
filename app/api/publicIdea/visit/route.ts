import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { getUserInServer } from "@/lib/supabaseUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  const user = await getUserInServer(request);

  if (!ideaId) return NextResponse.json({ error: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });

  if (user) {
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
    if (idea?.userId === user.id)
      return NextResponse.json(
        { isError: true, message: "자신의 아이디어의 방문자수는 카운트되지 않습니다." },
        { status: 400 }
      );
  }

  const cookieKey = `visited_today-${ideaId}`;

  const visitCookie = request.cookies.get(cookieKey);
  const response = NextResponse.json({ message: "success" });

  if (!visitCookie) {
    response.cookies.set(cookieKey, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      await prisma.ideaStats.upsert({
        where: { ideaId_date: { ideaId, date: today } },
        update: { visits: { increment: 1 } },
        create: { ideaId, visits: 1, emailCount: 0, date: today },
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  return response;
}
