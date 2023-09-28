"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Title } from "@/components/ui/text";
import { useSession } from "@/lib/hooks/session";
import { AiOutlinePlus } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default function Home({
  user,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      lockers: {
        include: {
          temporaryKeys: true;
        };
      };
    };
  }>;
}) {
  return (
    <div className="h-screen">
      <div>
        <Link href={"/cadastrar"}>
          <Card className="fixed bottom-0 -translate-x-1/2 left-1/2 rounded-full p-3 mb-4">
            <AiOutlinePlus size={32} />
          </Card>
        </Link>
        <Title className="m-4 mt-6 mb-6">Fechaduras</Title>
        {user.lockers.map((locker) => (
          <Card key={locker.id} className="m-4">
            <CardHeader>
              <CardTitle className="text-xl">{locker.name}</CardTitle>
              <CardDescription>
                Status:{" "}
                <span
                  className={`${
                    locker.status === "DESCONECTADO" ? "text-red-500" : ""
                  }`}
                >
                  {locker.status}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
