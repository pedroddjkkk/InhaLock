import { auth } from "@/auth/lucia";
import { isRedirectError } from "@/lib/utils";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);

  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  await auth.invalidateSession(session.sessionId);

  authRequest.setSession(null);

  try {
    redirect("/login");
  } catch (e) {
    if (isRedirectError(e)) throw e;
  }
};
