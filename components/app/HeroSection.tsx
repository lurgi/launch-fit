import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="w-full text-center px-6 py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">당신의 아이디어, 시장이 원할까요?</h1>
      <p className="mt-4 text-lg text-gray-600">🚀 Prelaunch로 빠르게 시장 반응을 확인하세요!</p>
      <Link href="/admin/idea-submission">
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
          내 아이디어 검증해보기
        </Button>
      </Link>
    </main>
  );
}
