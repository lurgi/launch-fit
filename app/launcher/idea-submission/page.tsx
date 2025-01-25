"use client";
import { useState } from "react";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import IdeaForm from "@/components/app/launcher/IdeaForm";
import CopyButton from "@/components/common/CopyButton";
import LinkToIdeaButton from "@/components/app/launcher/LinkToIdeaButton";

export default function IdeaSubmissionPage() {
  const [ideaId, setIdeaId] = useState<string | null>();

  return (
    <>
      <LauncherSectionHeader
        title="당신의 아이디어를 공유하세요!"
        description="빠르게 시장 반응을 확인하고, 관심 있는 사용자들의 이메일을 확보하세요."
      />

      {!ideaId ? (
        <IdeaForm
          method="create"
          onSubmit={({ ideaId }) => setIdeaId(ideaId)}
          defaultValues={{ title: "", description: "", emailText: "", website: "" }}
        />
      ) : (
        <div className="w-full max-w-2xl text-center mt-6">
          <h2 className="text-2xl font-bold text-green-600">
            <span className="text-4xl">🎉</span> 관심 등록 페이지가 생성되었습니다!
          </h2>
          <p className="mt-2 text-gray-600">링크를 복사하여 공유해보세요!</p>
          <div className="flex justify-center gap-4 text-xl mt-4">
            <CopyButton copyText={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/idea/${ideaId}`} innerText="링크 복사" />
            <LinkToIdeaButton ideaId={ideaId} />
          </div>
        </div>
      )}
    </>
  );
}
