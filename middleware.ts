import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refreshes Supabase auth cookies for public accounts across the site and also
// gates /admin. Admin pages retain their separate email allow-list; signing in
// as a public user never grants admin access.
const ADMIN_EMAIL = "poonacha@cyberhuman.ai";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page and the magic-link callback must stay reachable while
  // signed out — never gate them (that would loop).
  const isPublicAdminPath =
    pathname === "/admin/login" || pathname.startsWith("/admin/auth");

  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // If auth isn't configured, keep the public site available. Admin traffic
  // still goes to its setup-aware login page.
  if (!url || !anon) {
    if (pathname.startsWith("/admin") && !isPublicAdminPath) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user && (user.email || "").toLowerCase() === ADMIN_EMAIL;

  if (!pathname.startsWith("/admin")) return response;

  if (isPublicAdminPath) {
    // Already signed in as admin? Skip the login page, go to the dashboard.
    if (isAdmin && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
