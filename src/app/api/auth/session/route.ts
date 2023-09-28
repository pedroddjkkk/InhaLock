import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth/lucia";
import { LuciaError } from "lucia";

export async function GET() {
  const cookieStore = cookies();

  try {
    const sessionCookie = cookieStore.get("auth_session");

    if (!sessionCookie?.value)
      return NextResponse.json({ error: "No session found" }, { status: 401 });

    const session = await auth.validateSession(sessionCookie?.value);

    if (session.fresh) {
      const sessionCookie = auth.createSessionCookie(session);
      cookieStore.set("auth_session", sessionCookie.value);
    }

    return NextResponse.json({ session });
  } catch (e) {
    if (e instanceof LuciaError && e.message === `AUTH_INVALID_SESSION_ID`) {
      cookieStore.delete("auth_session");
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }
  }
}
