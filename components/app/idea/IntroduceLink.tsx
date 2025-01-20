"use client";
import Link from "next/link";

export default function IntroduceLink({ website }: { website?: string }) {
  return website ? (
    <Link
      href={website}
      className="text-lg text-gray-600 underline text-center font-semibold my-4 hover:text-blue-600"
      target="_blank"
    >
      👉 소개 페이지 바로가기
    </Link>
  ) : (
    <span className="text-lg text-gray-600 underline text-center font-semibold my-4 hover:text-blue-600">
      👉 소개 페이지 바로가기
    </span>
  );
}
