import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * Prisma 에러를 처리하고 적절한 HTTP 응답을 반환하는 함수
 */
export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json({ isError: true, message: "이미 존재하는 값입니다." }, { status: 400 });

      case "P2003":
        return NextResponse.json({ isError: true, message: "잘못된 참조 키입니다." }, { status: 400 });

      case "P2025":
        return NextResponse.json({ isError: true, message: "존재하지 않는 데이터입니다." }, { status: 404 });

      default:
        return NextResponse.json({ isError: true, message: `Prisma 오류 발생: ${error.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ isError: true, message: "서버 내부 오류 발생." }, { status: 500 });
}
