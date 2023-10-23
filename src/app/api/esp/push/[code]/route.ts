import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const webpush = require("web-push");

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const users = await prisma.user.findMany({
    where: {
      lockers: {
        some: {
          securityCode: params.code,
        },
      },
    },
  });

  webpush.setVapidDetails(
    "mailto:pedroddjkk@email.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  users.forEach((user) => {
    webpush.sendNotification(
      user.pushSubscription,
      JSON.stringify({
        title: "Alguem está tentando abrir sua porta!",
        options: {
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
