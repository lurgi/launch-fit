"use client";
import HomeFooter from "@/components/app/HomeFooter";
import EmailRegistrationForm from "@/components/app/idea/EmailRegisterationFrom";
import FeedbackRegisterationForm from "@/components/app/idea/FeedbackRegisterationForm";
import IdeaInfo from "@/components/app/idea/IdeaInfo";
import IntroduceLink from "@/components/app/idea/IntroduceLink";
import CopyButton from "@/components/common/CopyButton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Idea } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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
  const feedbackParam = useSearchParams().get("feedback");
  const defaultTabValue = feedbackParam ? "feedback" : "email";

  const { data } = useSWR<{ idea: Idea; isError: boolean }>(`/api/publicIdea?ideaId=${ideaId}`, getFetcher, {
    onSuccess: (data) => {
      if (data.isError) {
        router.push("/404");
      }
    },
  });
  const router = useRouter();
  const [emailRegistered, setEmailRegistered] = useState(false);
  const [feedbackRegistered, setFeedbackRegistered] = useState(false);

  const { trigger, isMutating } = useSWRMutation(`/api/publicIdea/visit?ideaId=${ideaId}`, postFetcher);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const { title, description, website } = data?.idea || {};
  const copyText = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/idea/${ideaId}`;

  return (
    <div className="flex flex-col min-h-screen min-w-screen relative pt-8 md:pt-16 pb-32">
      <main className="flex-1 flex flex-col items-center justify-center relative mb-12 px-6 md:px-12">
        {!emailRegistered && !feedbackRegistered ? (
          <>
            <IdeaInfo title={title} description={description} />
            <IntroduceLink website={website} />
            <Tabs defaultValue={defaultTabValue} className="w-full max-w-2xl">
              <TabsList>
                <TabsTrigger value="email">이메일 등록</TabsTrigger>
                <TabsTrigger value="feedback">피드백 하기</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <EmailRegistrationForm
                  ideaId={ideaId}
                  title={title}
                  onAfterSubmit={() => setEmailRegistered(true)}
                  isMutating={isMutating}
                />
              </TabsContent>
              <TabsContent value="feedback">
                <FeedbackRegisterationForm
                  ideaId={ideaId}
                  ideaTitle={title || ""}
                  onAfterSubmit={() => setFeedbackRegistered(true)}
                  isMutating={isMutating}
                />
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="w-full max-w-2xl text-center my-8 opacity-100 transition-opacity duration-500 ease-in-out">
            <h2 className="text-4xl font-bold text-green-600">
              🎉 {feedbackRegistered ? "피드백" : "이메일"} 등록 완료!
            </h2>
            <p className="mt-2 text-xl text-gray-600">등록해 주셔서 감사합니다! 🙌</p>
          </div>
        )}

        {/* 신뢰도 강화 UI */}
        {/* <div className="w-full max-w-2xl text-center mt-4">
            <p className="text-gray-600">
              현재까지 <span className="font-bold text-blue-600">{totalRegistrations}</span>명이 관심을 보였습니다!
            </p>
          </div> */}

        <div className="flex flex-col items-center justify-center mt-4 gap-4">
          <span className="text-lg text-gray-600">링크를 복사하여 아이디어를 공유해보세요!</span>
          <CopyButton copyText={copyText} innerText="링크 복사" />
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}
