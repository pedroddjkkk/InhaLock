import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const lock = await prisma.lock.findUnique({
    where: {
      securityCode: params.code,
    },
  });

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
      code: 2,
    });
  }

  const temporaryKey = lock.temporaryKeys
    .filter((key) => key.expiresAt.getTime() - new Date().getTime() > 0)
    .find((key) => key.password == body);

  if (lock.password == body || temporaryKey) {
    return NextResponse.json({
      code: 1,
    });
  } else {
    return NextResponse.json({
      code: 0,
    });
  }
}
