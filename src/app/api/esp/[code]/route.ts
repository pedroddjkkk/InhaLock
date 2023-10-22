import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    code: 0,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.text();

  if (body == "1") {
    return NextResponse.json({
      code: 1,
    });
  } else {
    return NextResponse.json({
      code: 0,
    });
  }
}
