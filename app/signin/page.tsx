"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Email login with:", email);
    router.push("/idea-dashboard");
  };

  const handleKakaoLogin = () => {
    console.log("Kakao login initiated");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      <div className="w-full max-w-md bg-zinc-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleEmailLogin} className="mb-4">
          <label className="block text-gray-700 font-medium text-left">📧 이메일</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4">
            이메일로 로그인
          </Button>
        </form>
        <p className="text-gray-600 text-sm">또는</p>
        <Button
          onClick={handleKakaoLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg mt-4"
        >
          🟡 카카오로 로그인
        </Button>
        <p className="text-gray-600 text-sm mt-4">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
