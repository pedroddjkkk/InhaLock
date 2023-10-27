import prisma from "@/lib/db";
import { sendNotificationBySecurityCode } from "@/lib/notifications";
import { NextRequest, NextResponse } from "next/server";
const webpush = require("web-push");

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const lock = await prisma.lock.update({
    where: {
      securityCode: params.code,
    },
    data: {
      status: "CONECTADO",
    },
  });

  if (lock.willOpen) {
    await prisma.lock.update({
      where: {
        securityCode: params.code,
      },
      data: {
        willOpen: false,
      },
    });

    return NextResponse.json({
      code: 1,
    });
  }

  return NextResponse.json({
    code: 2,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const body = await req.text();

  const lock = await prisma.lock.findUnique({
    where: {
      securityCode: params.code,
    },
    include: {
      temporaryKeys: true,
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

  const temporaryKey = lock.temporaryKeys
    .filter((key) => key.expiresAt.getTime() - new Date().getTime() > 0)
    .find((key) => key.password == body);

  if (lock.password == body || temporaryKey) {
    return NextResponse.json({
      code: 1,
    });
  } else if (lock.notificationPassword == body) {
    await sendNotificationBySecurityCode(params.code, {
      title: `Alguem abriu sua fechadura ${lock.name} com a senha de notificação!`,
    });

    return NextResponse.json({
      code: 1,
    });
  } else {
    await sendNotificationBySecurityCode(params.code, {
      title: "Alguem errou a senha da fechadura " + lock.name + "!",
    });

    return NextResponse.json({
      code: 0,
    });
  }
}
