import { NextResponse, type NextRequest } from "next/server";
import { getUserInServer } from "./lib/supabaseUtils";
import { createMiddleware } from "next-middleware-enhancer";

export const { middleware, config } = createMiddleware([
  { matcher: "/launcher/:path*", handler: redirectToSigninIfNotLoggedIn },
  { matcher: "/auth/:path*", handler: redirectToDashboardIfLoggedIn },
]);

async function redirectToDashboardIfLoggedIn(request: NextRequest) {
  const user = await getUserInServer(request);

  if (user) {
    const url = request.nextUrl.clone();
    url.pathname = "/launcher/idea-dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

async function redirectToSigninIfNotLoggedIn(request: NextRequest) {
  const user = await getUserInServer(request);

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
