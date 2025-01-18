"use client";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";

export default function IdeaSubmissionPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <LauncherSectionHeader
        title="당신의 아이디어를 공유하세요!"
        description="빠르게 시장 반응을 확인하고, 관심 있는 사용자들의 이메일을 확보하세요."
      />

      {/* 입력 폼 */}
      {!submitted ? (
        <form className="w-full bg-zinc-100 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">💡 아이디어 제목</label>
            <Input
              type="text"
              placeholder="예: 혁신적인 노트 앱"
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">📝 아이디어 설명</label>
            <textarea
              placeholder="간단한 설명을 입력하세요"
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg h-24"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">📩 이메일 등록 문구 설정</label>
            <Input
              type="text"
              placeholder="예: 관심이 있으시면 이메일을 입력하세요!"
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">🌐 소개 홈페이지</label>
            <Input
              type="url"
              placeholder="예: https://myproject.com"
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md">
            관심 등록 페이지 만들기
          </Button>
        </form>
      ) : (
        <div className="w-full max-w-2xl text-center mt-6">
          <h2 className="text-2xl font-bold text-green-600">
            <span className="text-4xl">🎉</span> 관심 등록 페이지가 생성되었습니다!
          </h2>
          <p className="mt-2 text-gray-600">아래 버튼을 눌러 친구들과 공유하세요.</p>
          <Button className="mt-3 bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">공유하기</Button>
        </div>
      )}
    </>
  );
}
