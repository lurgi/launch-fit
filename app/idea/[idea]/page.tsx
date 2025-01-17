"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function IdeaPage() {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const totalRegistrations = 128; // 예제 데이터

  const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setRegistered(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      {/* 아이디어 정보 */}
      <section className="w-full max-w-2xl text-center py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">🚀 혁신적인 노트 앱 NoteNote!</h1>
        <p className="mt-4 text-lg text-gray-600">
          이 노트 앱은 단순한 기록을 넘어, 사용자의 메모를 자동으로 정리하고 필요한 정보를 추천해 주는 AI 기반의 스마트
          노트 솔루션입니다. 직관적인 인터페이스와 강력한 검색 기능을 통해 언제 어디서든 빠르게 아이디어를 정리하고
          활용할 수 있습니다.
        </p>
      </section>

      {/* 이메일 등록 폼 */}
      {!registered ? (
        <form className="w-full max-w-2xl bg-zinc-100 p-6 rounded-lg shadow-md" onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">📩 관심이 있으신가요? 이메일을 입력하세요!</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="예: example@email.com"
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md">
            관심 등록하기
          </Button>
        </form>
      ) : (
        <div className="w-full max-w-2xl text-center mt-6 opacity-100 transition-opacity duration-500 ease-in-out">
          <h2 className="text-2xl font-bold text-green-600">🎉 관심 등록 완료!</h2>
          <p className="mt-2 text-gray-600">등록해 주셔서 감사합니다! 🙌</p>
        </div>
      )}

      {/* 신뢰도 강화 UI */}
      <div className="w-full max-w-2xl text-center mt-6">
        <p className="text-gray-600">
          현재까지 <span className="font-bold text-blue-600">{totalRegistrations}</span>명이 관심을 보였습니다!
        </p>
      </div>

      {/* SNS 공유 버튼 */}
      <div className="w-full max-w-2xl flex justify-center space-x-4 mt-6">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Twitter 공유</Button>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg">Instagram 공유</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg">Facebook 공유</Button>
      </div>
    </div>
  );
}
