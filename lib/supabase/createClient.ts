import { createServerClient as _createServerClient } from "@supabase/ssr";
import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function createServerClient(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  return _createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });
}

export async function createBrowserClient() {
  return _createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
