"use client";
import { useState } from "react";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import { Button } from "@/components/ui/button";
import IdeaForm from "@/components/app/launcher/IdeaForm";

export default function IdeaSubmissionPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <LauncherSectionHeader
        title="당신의 아이디어를 공유하세요!"
        description="빠르게 시장 반응을 확인하고, 관심 있는 사용자들의 이메일을 확보하세요."
      />

      {!submitted ? (
        <IdeaForm onSubmit={() => setSubmitted(true)} />
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
