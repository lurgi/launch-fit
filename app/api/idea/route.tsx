import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { getUserInServer } from "@/lib/supabaseUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, emailText, website } = await request.json();

  const user = await getUserInServer(request);

  if (!user) {
    return NextResponse.json({ isError: true, message: "사용자를 찾을 수 없습니다." }, { status: 401 });
  }
  try {
    const idea = await prisma.idea.create({
      data: {
        userId: user.id,
        title,
        description,
        emailText,
        website,
      },
    });
    return NextResponse.json(
      { isError: false, message: "아이디어가 생성되었습니다.", ideaId: idea.id },
      { status: 201 }
    );
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function GET(request: NextRequest) {
  const ideaId = request.nextUrl.searchParams.get("ideaId");
  if (!ideaId) {
    return NextResponse.json({ isError: true, message: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });
  }

  const user = await getUserInServer(request);
  if (!user) {
    return NextResponse.json({ isError: true, message: "사용자를 찾을 수 없습니다." }, { status: 401 });
  }

  try {
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId, userId: user.id },
      include: { stats: { orderBy: { date: "desc" } }, emails: { orderBy: { createdAt: "desc" } } },
    });

    if (!idea) {
      return NextResponse.json({ isError: true, message: "아이디어를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ idea });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(request: NextRequest) {
  const { title, description, emailText, website, ideaId } = await request.json();

  if (!ideaId) {
    return NextResponse.json({ isError: true, message: "아이디어 ID를 찾을 수 없습니다." }, { status: 400 });
  }

  const user = await getUserInServer(request);

  if (!user) {
    return NextResponse.json({ isError: true, message: "사용자를 찾을 수 없습니다." }, { status: 401 });
  }
  try {
    const idea = await prisma.idea.update({
      where: { id: ideaId, userId: user.id },
      data: {
        title,
        description,
        emailText,
        website,
      },
    });
    return NextResponse.json(
      { isError: false, message: "아이디어가 수정되었습니다.", ideaId: idea.id },
      { status: 200 }
    );
  } catch (error) {
    return handlePrismaError(error);
  }
}
