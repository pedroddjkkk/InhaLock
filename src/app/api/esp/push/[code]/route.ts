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

  const lock = await prisma.lock.findUnique({
    where: {
      securityCode: params.code,
    },
    select: {
      name: true,
    },
  });

  if (!lock) {
    return NextResponse.json({
      code: 3,
    });
  }

  webpush.setVapidDetails(
    "mailto:pedroddjkk@email.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  sessions.forEach((session) => {
    if (!session.pushSubscription && !session.user.sendNotification) return;
    webpush.sendNotification(
      session.pushSubscription,
      JSON.stringify({
        title: "Alguem está tentando abrir sua fechadura " + lock.name + "!",
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
