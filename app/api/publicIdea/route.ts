import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  if (!ideaId) {
    return NextResponse.json({ isError: true, message: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });
  }

  try {
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
    return NextResponse.json({ idea });
  } catch (error) {
    return handlePrismaError(error);
  }
}

const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력하세요."),
});

export async function POST(request: NextRequest) {
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  if (!ideaId) {
    return NextResponse.json({ isError: true, message: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });
  }

  const { email } = await request.json();
  const result = emailSchema.safeParse({ email });
  if (!result.success) {
    return NextResponse.json({ isError: true, message: result.error.message }, { status: 400 });
  }

  try {
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
      include: { emails: { where: { email } } },
    });

    if (!idea) {
      return NextResponse.json({ isError: true, message: "아이디어를 찾을 수 없습니다." }, { status: 404 });
    }

    if (idea.emails.length > 0) {
      return NextResponse.json({ isError: true, message: "이미 이메일을 등록하셨습니다." }, { status: 400 });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await prisma.ideaStats.upsert({
      where: { ideaId, date: today },
      update: { emailCount: { increment: 1 } },
      create: { ideaId, visits: 0, emailCount: 1, date: today },
    });

    await prisma.emailRecord.create({
      data: {
        ideaId,
        email,
      },
    });

    return NextResponse.json({ isError: false, message: "이메일 등록 완료" }, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}
