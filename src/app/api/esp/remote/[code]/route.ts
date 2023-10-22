import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const res = await prisma.lock.update({
    where: {
      securityCode: params.code,
    },
    data: {
      willOpen: true,
    },
  });

  return NextResponse.json(res);
}
