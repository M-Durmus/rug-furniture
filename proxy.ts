import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lowered = url.pathname.toLowerCase();
  const normalized = lowered.length > 1 && lowered.endsWith("/") ? lowered.slice(0, -1) : lowered;
  if (normalized !== url.pathname) {
    url.pathname = normalized;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
