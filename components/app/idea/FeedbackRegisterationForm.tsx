"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const schema = z.object({
  feedback: z
    .string()
    .min(10, "피드백은 최소 10자 이상 입력해주세요.")
    .max(500, "피드백은 최대 500자까지 입력 가능합니다."),
});

type Schema = z.infer<typeof schema>;

const postFetcher = async (url: string, { arg }: { arg: { feedback: string } }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return response.json();
};

export default function FeedbackForm({
  ideaId,
  ideaTitle,
  onAfterSubmit,
  isMutating,
}: {
  ideaId: string;
  ideaTitle: string;
  onAfterSubmit: () => void;
  isMutating: boolean;
}) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      feedback: "",
    },
  });

  const { toast } = useToast();
  const { trigger, isMutating: isSubmitting } = useSWRMutation(
    `/api/publicIdea/feedback?ideaId=${ideaId}`,
    postFetcher
  );

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const result = await trigger({ feedback: data.feedback });
    if (result.isError) {
      const { dismiss } = toast({
        title: "피드백 제출 실패",
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
        {/* 피드백 입력 필드 */}
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">💬 피드백</FormLabel>
              <FormDescription className={`text-sm text-gray-600 min-h-5`}>
                {ideaTitle}에 대한 피드백을 남겨주세요!
              </FormDescription>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="서비스에 대한 피드백을 자유롭게 작성해주세요."
                  className="resize-none h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md"
          disabled={isMutating || isSubmitting}
        >
          {isMutating || isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "피드백 제출하기"}
        </Button>
      </form>
    </Form>
  );
}
