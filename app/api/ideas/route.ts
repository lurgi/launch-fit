import prisma from "@/lib/prisma";
import { getUserInServer } from "@/lib/supabaseUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUserInServer(request);

  if (!user) {
    return NextResponse.json({ isError: true, message: "사용자를 찾을 수 없습니다." }, { status: 401 });
  }

  const ideas = await prisma.idea.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ ideas }, { status: 200 });
}
