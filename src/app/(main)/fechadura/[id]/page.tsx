import { LockerDetails } from "@/components/client";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

async function getLockById(id: number) {
  const lock = await prisma.lock.findUnique({
    where: {
      id,
    },
    select: {
      description: true,
      id: true,
      name: true,
      password: true,
      securityCode: true,
      status: true,
      user_id: true,
      temporaryKeys: {
        where: {
          expiresAt: {
            gt: new Date(),
          },
        },
      },
    },
  });

  return lock;
}

export const revalidate = 0;

export default async function EditLock({ params }: { params: { id: string } }) {
  let lock = await getLockById(Number(params.id));

  if (!lock || !lock.id) return redirect("/");

  return <LockerDetails lock={lock} />;
}
