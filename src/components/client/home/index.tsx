"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlinePlus } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Navbar } from "..";

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
      <div className="mx-4">
        <Link href={"/fechadura/cadastrar"}>
          <div className="fixed bottom-0 -translate-x-1/2 left-1/2 w-[80%] bg-[#26C967] flex flex-row items-center justify-center p-3 rounded-lg mb-3">
            <AiOutlinePlus size={32} className="text-white" />
            <span className="text-white">ADICIONAR</span>
          </div>
        </Link>
        <Navbar title="Fechaduras" />
        {user.lockers.map((locker) => (
          <Link href={`/fechadura/${locker.id}`} key={locker.id}>
            <Card className="my-4">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
