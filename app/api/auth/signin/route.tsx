import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/serverClient";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  const url = request.nextUrl.clone();
  url.pathname = "/launcher/idea-dashboard";

  const response = NextResponse.json(url, { status: 302 });
  const headers = response.headers;
  const supabase = await createServerClient({ request, headers });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      {
        isError: true,
        message: "로그인에 실패했습니다.",
        errors: error.message,
      },
      { status: 400 }
    );
  }

  return response;
}
