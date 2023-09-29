"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Title } from "@/components/ui/text";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import axios from "axios";

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
        <Link href={"/fechadura/cadastrar"}>
          <Card className="fixed bottom-0 -translate-x-1/2 left-1/2 rounded-full p-3 mb-4">
            <AiOutlinePlus size={32} />
          </Card>
        </Link>
        <div className="mt-6 mb-6 flex flex-row justify-between w-full items-center">
          <Title className="m-4  ml-5">Fechaduras</Title>
          <Sheet>
            <SheetTrigger className="m-4 mr-6">
              <AiOutlineMenu size={28} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  Olá {user.username}, seja bem vindo(a)!
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button
                  variant="outline"
                  className="gap-[2px] mt-4"
                  onClick={async () => await axios.post("/api/auth/logout")}
                >
                  <IoExitOutline />
                  Sair
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {user.lockers.map((locker) => (
          <Link href={`/fechadura/${locker.id}`} key={locker.id}>
            <Card className="m-4">
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
