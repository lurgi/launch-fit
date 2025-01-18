"use client";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/app/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const handleKakaoLogin = () => {
    console.log("Kakao login initiated");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md p-6 rounded-lg border-2 border-zinc-100 text-center">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <LoginForm />

        <div className="text-gray-600 text-sm my-4">또는</div>

        <Button
          onClick={handleKakaoLogin}
          className="w-full flex items-cener justify-between bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
        >
          <Image src="/kakao.png" alt="kakao logo" width={18} height={18} />
          <div className="text-center flex-1 whitespace-nowrap">카카오 간편 로그인</div>
        </Button>
        <p className="text-gray-600 text-sm mt-4">
          <span className="mr-1">계정이 없으신가요?</span>
          <Link href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
