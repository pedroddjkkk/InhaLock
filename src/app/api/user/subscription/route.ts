import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSideSession();

  if (!session)
    return NextResponse.json({ error: "No session found" }, { status: 200 });

  const body = await req.json();

  const user = await prisma.user.update({
    where: {
      id: session.user.userId,
    },
    data: {
      pushSubscription: body,
    },
  });

  return NextResponse.json(user);
}
