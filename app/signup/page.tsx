"use client";
import Link from "next/link";
import SignupForm from "@/components/app/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      <div className="w-full max-w-md p-6 rounded-lg border-2 border-zinc-100 text-center">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        {/* 회원가입 폼 */}
        <SignupForm />

        <p className="text-gray-600 text-sm mt-4">
          <span className="mr-1">이미 계정이 있으신가요?</span>
          <Link href="/signin" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
