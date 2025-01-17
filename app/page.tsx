import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      {/* Hero Section */}
      <header className="w-full max-w-3xl text-center px-6 py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">당신의 아이디어, 시장이 원할까요?</h1>
        <p className="mt-4 text-lg text-gray-600">Prelaunch로 빠르게 시장 반응을 확인하세요!</p>
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
          내 아이디어 검증해보기
        </Button>
      </header>

      {/* Example Section */}
      <section className="w-full max-w-3xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">✨ 성공 사례</h2>
        <p className="mt-4 text-gray-600">XX 브랜드는 Prelaunch로 500명의 관심 고객을 확보했습니다!</p>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-3xl px-6 py-8 text-center border-t text-gray-500">
        <p>© 2025 Prelaunch.kr. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            이용약관
          </a>
          <a href="#" className="hover:underline">
            개인정보처리방침
          </a>
        </div>
      </footer>
    </div>
  );
}
