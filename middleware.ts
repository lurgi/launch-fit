import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "./lib/supabase/createClient";

export async function middleware(request: NextRequest) {
  const supabase = await createServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/launcher/:path*",
};
