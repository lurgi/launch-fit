"use client";
import HomeFooter from "@/components/app/HomeFooter";
import EmailRegistrationForm from "@/components/app/idea/EmailRegisterationFrom";
import IdeaInfo from "@/components/app/idea/IdeaInfo";
import IntroduceLink from "@/components/app/idea/IntroduceLink";
import CopyButton from "@/components/common/CopyButton";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface Idea {
  id: string;
  title: string;
  description: string;
  emailText: string;
  website: string;
}

const getFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const postFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
  });
  return response.json();
};

export default function IdeaPage() {
  const { ideaId } = useParams() as { ideaId: string };
  const { data, isLoading } = useSWR<{ idea: Idea }>(`/api/publicIdea?ideaId=${ideaId}`, getFetcher);
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const { trigger } = useSWRMutation(`/api/publicIdea/visit?ideaId=${ideaId}`, postFetcher);

  useEffect(() => {
    trigger();
  }, [trigger]);

  if (!data && !isLoading) return router.push("/404");
  const { title, description, emailText, website } = data?.idea || {};
  const copyText = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/idea/${ideaId}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {!registered ? (
        <>
          <IdeaInfo title={title} description={description} />
          <IntroduceLink website={website} />
          <EmailRegistrationForm ideaId={ideaId} emailText={emailText} onAfterSubmit={() => setRegistered(true)} />

          {/* 신뢰도 강화 UI */}
          {/* <div className="w-full max-w-2xl text-center mt-4">
            <p className="text-gray-600">
              현재까지 <span className="font-bold text-blue-600">{totalRegistrations}</span>명이 관심을 보였습니다!
            </p>
          </div> */}
        </>
      ) : (
        <div className="w-full max-w-2xl text-center my-8 opacity-100 transition-opacity duration-500 ease-in-out">
          <h2 className="text-4xl font-bold text-green-600">🎉 관심 등록 완료!</h2>
          <p className="mt-2 text-xl text-gray-600">등록해 주셔서 감사합니다! 🙌</p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-4">
        <span className="text-lg text-gray-600">링크를 복사하여 아이디어를 공유해보세요!</span>
        <CopyButton copyText={copyText} innerText="링크 복사" />
      </div>

      <HomeFooter />
    </div>
  );
}
