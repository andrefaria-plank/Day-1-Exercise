import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/cards", "/play"];
const authRoutes = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some(
    (r) => path === r || path.startsWith(r + "/")
  );
  const isAuthRoute = authRoutes.includes(path);

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect authenticated users away from login/signup
  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/cards", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
