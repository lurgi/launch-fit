"use cleint";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "올바른 이메일 주소를 입력해주세요." })
    .max(50, "이메일은 50자 이하로 입력하세요."),
  agreeTerms: z
    .boolean()
    .optional()
    .refine((val) => val === true, {
      message: "개인정보처리방침에 동의해야 합니다.",
    }),
});

type Schema = z.infer<typeof schema>;

const postFetcher = async (url: string, { arg }: { arg: { email: string } }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return response.json();
};

export default function EmailRegistrationForm({
  ideaId,
  emailText,
  onAfterSubmit,
  isMutating,
}: {
  ideaId: string;
  emailText?: string;
  onAfterSubmit: () => void;
  isMutating: boolean;
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
              <FormDescription className={`text-sm text-gray-600 min-h-5`}>{emailText && emailText}</FormDescription>
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

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md"
          disabled={isMutating}
        >
          {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : "관심 등록하기"}
        </Button>
      </form>
    </Form>
  );
}
