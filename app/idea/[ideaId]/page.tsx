"use client";
import HomeFooter from "@/components/app/HomeFooter";
import CopyButton from "@/components/common/CopyButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

interface Idea {
  id: string;
  title: string;
  description: string;
  emailText: string;
  website: string;
}

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "개인정보처리방침에 동의해야 합니다.",
  }),
});

type Schema = z.infer<typeof schema>;

const getFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function IdeaPage() {
  const { ideaId } = useParams() as { ideaId: string };
  const { data, isLoading } = useSWR<{ idea: Idea }>(`/api/publicIdea?ideaId=${ideaId}`, getFetcher);
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  if (!data && !isLoading) return router.push("/404");
  const { title, description, emailText, website } = data?.idea || {};

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
        <CopyButton copyText={`${window.location.origin}/idea/${ideaId}`} innerText="링크 복사" />
      </div>

      <HomeFooter />
    </div>
  );
}

const postFetcher = async (url: string, { arg }: { arg: { email: string } }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return response.json();
};

function EmailRegistrationForm({
  ideaId,
  emailText,
  onAfterSubmit,
}: {
  ideaId: string;
  emailText?: string;
  onAfterSubmit: () => void;
}) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  const { trigger } = useSWRMutation(`/api/publicIdea?ideaId=${ideaId}`, postFetcher);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const result = await trigger({ email: data.email });
    if (result.isError) {
      const { dismiss } = toast({
        title: "이메일 등록 실패",
        description: result.error instanceof Error ? result.error.message : result.message,
        variant: "destructive",
      });
      setTimeout(() => {
        dismiss();
      }, 3000);
      return;
    }
    onAfterSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-2xl space-y-4 bg-zinc-100 p-6 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">이메일을 등록하세요!</FormLabel>
              <FormDescription className={`text-sm text-gray-600 h-5 ${emailText || "animate-pulse"}`}>
                {emailText && emailText}
              </FormDescription>
              <FormControl>
                <Input type="email" {...field} placeholder="예: example@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <div className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-md font-semibold">개인정보처리방침에 동의합니다. (필수)</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md">
          관심 등록하기
        </Button>
      </form>
    </Form>
  );
}

function IdeaInfo({ title, description }: { title?: string; description?: string }) {
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSkeleton(true);
    }, 1000);
  }, []);

  return (
    <section className="w-full max-w-2xl text-center">
      <h1
        className={cn("text-3xl font-bold sm:text-4xl h-10", !title && isShowSkeleton && "bg-gray-200 animate-pulse")}
      >
        {title && title}
      </h1>
      <p
        className={cn("mt-4 text-lg text-gray-600 h-7", !description && isShowSkeleton && "bg-gray-200 animate-pulse")}
      >
        {description && description}
      </p>
    </section>
  );
}

function IntroduceLink({ website }: { website?: string }) {
  return website ? (
    <Link
      href={website}
      className="text-lg text-gray-600 underline text-center font-semibold my-4 hover:text-blue-600"
      target="_blank"
    >
      👉 소개 페이지 바로가기
    </Link>
  ) : (
    <span className="text-lg text-gray-600 underline text-center font-semibold my-4 hover:text-blue-600">
      👉 소개 페이지 바로가기
    </span>
  );
}
