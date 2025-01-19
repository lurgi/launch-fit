import { createClient } from "@/lib/supabase/createClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

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

export async function POST(request: NextRequest) {
  const data: SignupFormValues = await request.json();
  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      {
        isError: true,
        message: "회원가입에 실패했습니다.",
        errors: result.error.format(),
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const supabase = await createClient(request);
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return NextResponse.json(
      {
        isError: true,
        message: "회원가입에 실패했습니다.",
        errors: error.message,
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.json(
    {
      isError: false,
      message: "회원가입 성공! 로그인을 해주세요.",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
