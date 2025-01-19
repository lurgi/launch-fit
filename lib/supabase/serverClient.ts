import { createServerClient as _createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { CookieSerializeOptions } from "cookie";

export interface SupabaseServerArgs {
  request: NextRequest;
  headers?: Headers;
}

export function createServerClient(args: SupabaseServerArgs) {
  const supabaseResponse = NextResponse.next({
    request: args.request,
  });
  const headers = args.headers ?? new Headers();

  return _createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return args.request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          args.request.cookies.set(name, value);
          supabaseResponse.cookies.set(name, value, options);
          headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
        });
      },
    },
  });
}

export function serializeCookieHeader(name: string, value: string, options: CookieSerializeOptions = {}): string {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookie += `; Max-Age=${options.maxAge}`;
  }

  if (options.domain) {
    cookie += `; Domain=${options.domain}`;
  }

  if (options.path) {
    cookie += `; Path=${options.path}`;
  } else {
    cookie += `; Path=/`; // 기본값 설정
  }

  if (options.expires) {
    cookie += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.httpOnly) {
    cookie += `; HttpOnly`;
  }

  if (options.secure) {
    cookie += `; Secure`;
  }

  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`;
  }

  return cookie;
}
