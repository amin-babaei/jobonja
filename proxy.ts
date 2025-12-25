import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  const authPaths = [
    "/auth/register/candidate",
    "/auth/login/candidate",
  ];

  if (session && authPaths.some((path) => pathname.startsWith(path))) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/auth/:path*"
  ],
};