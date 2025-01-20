import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="w-full text-center px-6 py-12">
      <h1 className="w-full text-4xl font-bold sm:text-5xl" style={{ wordBreak: "keep-all" }}>
        🤔 당신의 아이디어, 시장이 원할까요?
      </h1>
      <p className="mt-4 text-2xl font-semibold text-blue-600" style={{ wordBreak: "keep-all" }}>
        <strong>아이디어, 시작 전에 검증하세요!</strong>
      </p>
      <div>
        <p className="mt-4 text-md text-gray-600">
          <strong>Launch Fit</strong>를 통해 아이디어의 시장 반응을 빠르게 확인하세요!
        </p>
        <p className="text-md text-gray-500">
          간단하게 <strong>페이지</strong>를 만들고, <strong>관심 있는 사용자</strong>들의 이메일을 확보할 수 있어요.
        </p>
      </div>
      <Link href="/launcher/idea-submission">
        <Button className="mt-6 px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
          🚀 내 아이디어 검증해보기
        </Button>
      </Link>
    </main>
  );
}
