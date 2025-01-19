import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prismaUtils";
import { createServerClient } from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, emailText, website } = await request.json();

  const supabase = createServerClient({ request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
