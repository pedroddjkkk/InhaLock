import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "./utils";
import { LuciaError } from "lucia";
import axios from "axios";

export async function getServerSideSession() {
  try {
    const cookieStore = cookies();

    const sessionCookie = cookieStore.get("auth_session");
    if (!sessionCookie) redirect("/login");

    const session = await auth.validateSession(sessionCookie?.value);

    if (session.fresh) {
      const sessionCookie = auth.createSessionCookie(session);
      cookieStore.set("auth_session", sessionCookie.value);
    }

    return session;
  } catch (e) {
    if (isRedirectError(e)) throw e;
    if (e instanceof LuciaError && e.message === `AUTH_INVALID_SESSION_ID`) {
      redirect("/login");
    }
  }
}
