import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { createLockSchema } from "@/lib/validations/lock";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createTemporaryKeySchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  password: z
    .string({ required_error: "Nome é obrigatório" })
    .min(4, "Senha deve ter pelo menos 4 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

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

  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 30);

  const key = await prisma.temporaryLockKey.create({
    data: {
      name: validatedInput.data.name,
      password: validatedInput.data.password,
      lock_id: Number(params.id),
      expiresAt: expirationDate,
    },
  });

  revalidatePath(`/fechadura/${params.id}`);

  return NextResponse.json(key);
}
