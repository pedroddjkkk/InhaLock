import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { createLockSchema } from "@/lib/validations/lock";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const body = Object.fromEntries(formData.entries());

  const validatedLockInput = createLockSchema.safeParse(body);

  if (!validatedLockInput.success) {
    return NextResponse.json(
      {
        field: validatedLockInput.error.issues[0].path[0],
        message: validatedLockInput.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const session = await getServerSideSession();

  if (!session)
    return NextResponse.json({ error: "No session found" }, { status: 401 });

  const lock = await prisma.lock.create({
    data: {
      name: validatedLockInput.data.name,
      password: validatedLockInput.data.password,
      description: validatedLockInput.data.description,
      user: {
        connect: {
          id: session.user.userId,
        },
      },
      securityCode: validatedLockInput.data.securityCode,
    },
  });

  
  revalidatePath(`/`);

  return NextResponse.json(lock);
}
