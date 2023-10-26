"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { BsGear, BsHouseDoor } from "react-icons/bs";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar({ title }: { title: string }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="mt-6 mb-6 flex flex-row justify-between w-full items-center">
      <Title>{title}</Title>
      <Sheet>
        <SheetTrigger>
          <AiOutlineMenu size={28} />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col relative h-full">
            <SheetHeader>
              <SheetDescription>
                {session.loading
                  ? "Carregando..."
                  : `Olá ${session.session?.user.username}, seja bem vindo(a)!`}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col justify-center">
              <Separator className="my-6" />
              <Link
                className={
                  buttonVariants({ variant: "outline" }) +
                  ` mb-2 gap-[2px] hover:bg-gray-50 transition-colors duration-150 ${
                    pathnameArray[0] === "" ? "bg-gray-50" : ""
                  }`
                }
                href={"/"}
              >
                <BsHouseDoor />
                Início
              </Link>
              <Link
                className={
                  buttonVariants({ variant: "outline" }) +
                  ` mb-2 gap-[2px] hover:bg-gray-50 transition-colors duration-150 ${
                    pathnameArray[1] === "configuracoes" ? "bg-gray-50" : ""
                  }`
                }
                href={"/configuracoes"}
              >
                <BsGear />
                Configurações
              </Link>
            </div>
            <SheetFooter className="absolute bottom-0 w-full">
              <Button
                variant="outline"
                className="gap-[2px]"
                onClick={async () => {
                  const res = await axios.post("/api/auth/logout");

                  if (res.status === 200) {
                    router.push("/login");
                  }
                }}
              >
                <IoExitOutline />
                Sair
              </Button>
              <Separator className="mb-6" />
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
