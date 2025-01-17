"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("Signing up with:", email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      <div className="w-full max-w-md bg-zinc-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form onSubmit={handleSignup}>
          <label className="block text-gray-700 font-medium text-left">📧 이메일</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
          />

          <label className="block text-gray-700 font-medium text-left mt-4">🔑 비밀번호</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
          />

          <label className="block text-gray-700 font-medium text-left mt-4">🔑 비밀번호 확인</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4">
            회원가입
          </Button>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
