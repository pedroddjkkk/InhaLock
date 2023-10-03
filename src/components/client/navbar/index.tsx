"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Title } from "@/components/ui/text";
import { useSession } from "@/lib/hooks/session";
import axios from "axios";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

export default function Navbar({ title }: { title: string }) {
  const session = useSession();

  return (
    <div className="mt-6 mb-6 flex flex-row justify-between w-full items-center">
      <Title>{title}</Title>
      <Sheet>
        <SheetTrigger>
          <AiOutlineMenu size={28} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              {session.loading
                ? "Carregando..."
                : `Olá ${session.session?.user.username}, seja bem vindo(a)!`}
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
  );
}
