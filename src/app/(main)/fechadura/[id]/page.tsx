import { LockerForm } from "@/components/client";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

async function getLockById(id: number) {
  const lock = await prisma.lock.findUnique({
    where: {
      id,
    },
    include: {
      temporaryKeys: true,
    },
  });

  return lock;
}

export const revalidate = 0;

export default async function EditLock({ params }: { params: { id: string } }) {
  const lock = await getLockById(Number(params.id));

  if (!lock || !lock.id) return redirect("/");

  return <LockerForm lock={lock} />;
}
