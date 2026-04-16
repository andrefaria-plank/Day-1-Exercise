import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";

// Verifies the session and redirects to /login if not authenticated.
// Memoized per request via React cache.
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { userId: session.userId, email: session.email };
});

// Returns session user data without redirecting — safe to call on public pages.
export const getSessionUser = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) return null;
  return { userId: session.userId, email: session.email };
});
