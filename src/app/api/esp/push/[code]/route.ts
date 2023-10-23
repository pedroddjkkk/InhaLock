import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const webpush = require("web-push");

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const sessions = await prisma.session.findMany({
    where: {
      user: {
        lockers: {
          some: {
            securityCode: params.code,
          },
        },
      },
    },
    include: {
      user: true,
    },
  });

  webpush.setVapidDetails(
    "mailto:pedroddjkk@email.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  sessions.forEach((session) => {
    if (!session.pushSubscription) return;
    webpush.sendNotification(
      session.pushSubscription,
      JSON.stringify({
        title: "Alguem está tentando abrir sua porta!",
        options: {
          data: {
            securityCode: params.code,
          },
          actions: [
            {
              action: "open",
              title: "Abrir",
            },
            {
              action: "deny",
              title: "Negar",
            },
          ],
        },
      })
    );
  });

  return NextResponse.json({ success: true });
}
