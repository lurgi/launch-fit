import { NextResponse, type NextRequest } from "next/server";
import { getUserInServer } from "./lib/supabaseUtils";
import { createMiddleware } from "next-middleware-enhancer";
import { RateLimiterMemory } from "rate-limiter-flexible";

export const { middleware, config } = createMiddleware([
  { matcher: "/launcher/:path*", handler: redirectToSigninIfNotLoggedIn },
  { matcher: "/auth/:path*", handler: redirectToDashboardIfLoggedIn },
  { matcher: "/api/publicIdea/:path*", handler: rateLimiterMiddleware },
]);

async function redirectToDashboardIfLoggedIn(request: NextRequest) {
  const user = await getUserInServer(request);

  if (user) {
    const url = request.nextUrl.clone();
    url.pathname = "/launcher/idea-dashboard";
    return NextResponse.redirect(url);
  }
}

async function redirectToSigninIfNotLoggedIn(request: NextRequest) {
  const user = await getUserInServer(request);

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }
}

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export async function rateLimiterMiddleware(request: NextRequest): Promise<void | NextResponse> {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  try {
    await rateLimiter.consume(ip);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ isError: true, message: "너무 많은 요청이 감지되었습니다." }, { status: 429 });
  }
}
