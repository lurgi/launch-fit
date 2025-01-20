import { NextResponse, type NextRequest } from "next/server";
import { getUserInServer } from "./lib/supabaseUtils";

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

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/launcher")) {
    return redirectToSigninIfNotLoggedIn(request);
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return redirectToDashboardIfLoggedIn(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/launcher/:path*", "/auth/:path*"],
};
