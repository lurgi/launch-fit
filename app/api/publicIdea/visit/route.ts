import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// 🔹 1분 동안 최대 10개의 요청만 허용 DDos공격 방지
const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  if (!ideaId) return NextResponse.json({ error: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });

  try {
    await rateLimiter.consume(ip);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ isError: true, message: "너무 많은 요청이 감지되었습니다." }, { status: 429 });
  }

  const visitCookie = request.cookies.get("visited_today");
  const response = NextResponse.json({ message: "success" });

  if (!visitCookie) {
    response.cookies.set("visited_today", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      await prisma.ideaStats.upsert({
        where: { ideaId, date: today },
        update: { visits: { increment: 1 } },
        create: { ideaId, visits: 1, date: today },
      });
    } catch (error) {
      return handlePrismaError(error);
    }
  }

  return response;
}
