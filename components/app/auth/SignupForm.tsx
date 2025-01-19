"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
import { CustomError } from "@/lib/CustomError";

const signupFetcher = async (url: string, { arg }: { arg: SignupFormValues }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new CustomError(res);
  }

  return response.json();
};

const signupSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력하세요.").email("올바른 이메일 형식을 입력하세요."),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .regex(/[A-Za-z]/, "비밀번호에는 최소 한 개의 영문자가 포함되어야 합니다.")
      .regex(/[0-9]/, "비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다."),
    passwordConfirm: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation("/api/signup", signupFetcher);

  const handleSignup = async (data: SignupFormValues) => {
    try {
      await trigger(data);
      router.push("/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { dismiss } = toast({
        title: error.message,
        description: error.errors,
        variant: "destructive",
      });
      setTimeout(dismiss, 3000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6 text-left">
        {/* 이메일 입력 필드 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 입력 필드 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 확인 입력 필드 */}
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호 확인" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isMutating}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4"
        >
          {isMutating ? <ImSpinner2 className="animate-spin" /> : "회원가입"}
        </Button>
      </form>
    </Form>
  );
}
