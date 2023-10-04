"use client";

import { Title } from "@/components/ui/text";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Navbar, TemporaryKeyForm } from "..";
import { AiOutlinePlus } from "react-icons/ai";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function LockerDetails({
  lock,
}: {
  lock: Prisma.LockGetPayload<{
    include: {
      temporaryKeys: true;
    };
  }>;
}) {
  const [error, setError] = useState<{ field: string; message: string }>();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mx-4">
      <Navbar title="Ver fechadura" />
      <div className="w-full bg-[#26C967] rounded-lg p-4 flex justify-center mt-8">
        <span className="text-2xl text-white">{lock?.name}</span>
      </div>
      <div className="flex flex-row mt-8 gap-6">
        <span>{lock.description}</span>
        <Link href={pathname + "/editar"} className="text-[#26C967]">
          Editar
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center mt-8">
        <Title className="text-lg font-semibold">Chaves temporárias</Title>
        <TemporaryKeyForm lock={lock} />
      </div>
      {lock.temporaryKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <span className="text-lg">Nenhuma chave temporária cadastrada</span>
        </div>
      ) : (
        lock.temporaryKeys.map((key) => {
          return (
            <Card key={key.id} className="mt-4">
              <CardHeader>
                <CardTitle className="text-xl">{key.name}</CardTitle>
              </CardHeader>
            </Card>
          );
        })
      )}
    </div>
  );
}
