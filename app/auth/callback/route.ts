import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/serverClient";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/launcher/idea-dashboard";
  const headers = new Headers();

  if (code) {
    const supabase = createServerClient({ request, headers });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`, { headers });
      } else {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}${next}`, { headers });
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/signin`);
}
