import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSideSession();

  if (!session)
    return NextResponse.json({ error: "No session found" }, { status: 200 });

  const body = await req.json();

  const updatedSession = await prisma.session.update({
    where: {
      id: session.sessionId,
    },
    data: {
      pushSubscription: body,
    },
  });

  return NextResponse.json({ succes: true });
}
