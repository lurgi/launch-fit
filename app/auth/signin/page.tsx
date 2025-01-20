"use client";
import LoginForm from "@/components/app/auth/LoginForm";
import Link from "next/link";
import KakaoAuthButton from "@/components/app/auth/KakaoAuthButton";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md p-6 rounded-lg border-2 border-zinc-100 text-center">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <LoginForm />

      <div className="text-gray-600 text-sm my-4">또는</div>
      <KakaoAuthButton />

      <p className="text-gray-600 text-sm mt-4">
        <span className="mr-1">계정이 없으신가요?</span>
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
