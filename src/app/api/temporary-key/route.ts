import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { createLockSchema } from "@/lib/validations/lock";
import { createTemporaryKeySchema } from "@/lib/validations/temporaryKeys";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const body = Object.fromEntries(formData.entries());

  const validatedInput = createTemporaryKeySchema.safeParse(body);

  if (!validatedInput.success) {
    return NextResponse.json(
      {
        field: validatedInput.error.issues[0].path[0],
        message: validatedInput.error.issues[0].message,
      },
      {
        status: 400,
      }
    );
  }

  const session = await getServerSideSession();

  if (!session)
    return NextResponse.json({ error: "No session found" }, { status: 401 });

  const key = await prisma.temporaryLockKey.create({
    data: {
      name: validatedInput.data.name,
      password: validatedInput.data.password,
      
    },
  });

  revalidatePath(`/`);

  return NextResponse.json(lock);
}
