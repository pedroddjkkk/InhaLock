import { Home } from "@/components/client";
import prisma from "@/lib/db";
import { getServerSideSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUserWithLockers(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      lockers: {
        include: {
          temporaryKeys: true,
        },
      },
    },
  });

  return user;
}

export const revalidate = 0;

export default async function HomePage() {
  const session = await getServerSideSession();
  const user = await getUserWithLockers(session.user.userId);

  if (!user) redirect("/login");

  return <Home user={user} />;
}
