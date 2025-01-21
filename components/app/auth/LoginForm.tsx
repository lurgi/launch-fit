"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useSWRMutation from "swr/mutation";
import { CustomError } from "@/lib/CustomError";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력하세요.")
    .email("올바른 이메일 형식을 입력하세요.")
    .max(50, "이메일은 50자 이하로 입력하세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다.").max(50, "비밀번호는 50자 이하로 입력하세요."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const loginFetcher = async (url: string, { arg }: { arg: LoginFormValues }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  if (!response.ok && response.status !== 302) {
    const res = await response.json();
    throw new CustomError(res);
  }

  return response.json();
};

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { trigger, isMutating } = useSWRMutation("/api/auth/signin", loginFetcher);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const url = await trigger(data);
      router.push(url);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
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
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요" {...field} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          disabled={isMutating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : "로그인"}
        </Button>
      </form>
    </Form>
  );
}
